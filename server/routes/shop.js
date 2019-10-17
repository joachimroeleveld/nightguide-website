const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const request = require('request-promise');
const express = require('express');
const find = require('lodash/find');
const bodyParser = require('body-parser');

const PAYMENT_METHODS = ['card', 'ideal'];
const BOOKING_FEE = 190; // €1,90
const CURRENCY = 'eur';

stripe.setApiVersion('2019-10-08');

const router = express.Router();

router.use(
  bodyParser.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function(req, res, buf) {
      if (req.originalUrl.startsWith('/api/shop/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

// Calculate total payment amount based on items in basket.
const calculatePaymentAmount = async (eventId, items) => {
  const event = await request(`${process.env.NG_API_HOST}/events/${eventId}`, {
    json: true,
  });

  const total = items.reduce((total, { sku, quantity }) => {
    if (!sku) {
      return total;
    }
    const price = find(event.tickets.products, { id: sku }).price;
    return total + price * quantity * 100; // Amount in cents
  }, 0);

  return total + BOOKING_FEE;
};

// Create the PaymentIntent on the backend.
router.post('/payment-intents', async (req, res, next) => {
  let { items, eventId } = req.body;

  try {
    const amount = await calculatePaymentAmount(eventId, items);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: CURRENCY,
      payment_method_types: PAYMENT_METHODS,
    });
    return res.status(200).json({ paymentIntent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Webhook handler to process payments for sources asynchronously.
router.post('/webhook', async (req, res) => {
  let data;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
  }
  const object = data.object;

  // Monitor `source.chargeable` events.
  if (
    object.object === 'source' &&
    object.status === 'chargeable' &&
    object.metadata.paymentIntent
  ) {
    const source = object;
    // Find the corresponding PaymentIntent this source is for by looking in its metadata.
    const paymentIntent = await stripe.paymentIntents.retrieve(
      source.metadata.paymentIntent
    );
    // Check whether this PaymentIntent requires a source.
    if (paymentIntent.status !== 'requires_payment_method') {
      return res.sendStatus(403);
    }
    // Confirm the PaymentIntent with the chargeable source.
    await stripe.paymentIntents.confirm(paymentIntent.id, {
      source: source.id,
    });
  }

  // Monitor `source.failed` and `source.canceled` events.
  if (
    object.object === 'source' &&
    ['failed', 'canceled'].includes(object.status) &&
    object.metadata.paymentIntent
  ) {
    const source = object;
    console.log(`🔔  The source ${source.id} failed or timed out.`);
    // Cancel the PaymentIntent.
    await stripe.paymentIntents.cancel(source.metadata.paymentIntent);
  }

  // Return a 200 success code to Stripe.
  res.sendStatus(200);
});

// Retrieve the PaymentIntent status.
router.get('/payment-intents/:id/status', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
  res.json({ paymentIntent: { status: paymentIntent.status } });
});

module.exports = router;
