const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const bodyParser = require('body-parser');

const {
  getEvent,
  createOrder,
  updateOrder,
  updateOrderMeta,
} = require('../lib/api');
const { calculatePaymentAmount, populateItemPrices } = require('../lib/shop');
const { CURRENCY, PAYMENT_METHODS } = require('../constants');

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

/**
 * Create payment intent
 */
router.post('/payment-intents', async (req, res, next) => {
  let { items, eventId } = req.body;

  try {
    const event = await getEvent(eventId);
    const itemsWithPrice = await populateItemPrices(event, items);
    const amount = await calculatePaymentAmount(itemsWithPrice);

    const order = await createOrder({
      status: 'pending',
      amount,
      currency: CURRENCY,
      items: itemsWithPrice,
      metadata: {
        eventId,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: CURRENCY.toLowerCase(),
      payment_method_types: PAYMENT_METHODS,
      metadata: {
        order_id: order.id,
      },
    });
    return res.status(200).json({ paymentIntent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * Webhook handler to process payments for sources asynchronously.
 */
router.post('/webhook', async (req, res) => {
  let data;
  let event;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
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
    event.type === 'source.chargeable' &&
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
    ['source.failed', 'source.canceled'].includes(event.type) &&
    object.object === 'source' &&
    ['failed', 'canceled'].includes(object.status) &&
    object.metadata.paymentIntent
  ) {
    const source = object;
    console.log(`🔔  The source ${source.id} failed or timed out.`);
    // Cancel the PaymentIntent.
    await stripe.paymentIntents.cancel(source.metadata.paymentIntent);
  }

  if (event.type === 'payment_intent.succeeded') {
    const {
      billing_details: billingDetails,
      receipt_url: receiptUrl,
    } = object.charges.data[0];
    const orderId = object.metadata.order_id;

    const order = {
      status: 'processing',
      billingDetails: {
        address: {
          country: billingDetails.address.country,
          // Optional address fields
          ...(billingDetails.address.city !== null
            ? {
                city: billingDetails.address.city,
                line1: billingDetails.address.line1,
                line2: billingDetails.address.line2,
                postalCode: billingDetails.address.postal_code,
                state: billingDetails.address.state,
              }
            : {}),
        },
        email: billingDetails.email,
        name: billingDetails.name,
      },
    };
    try {
      await updateOrder(orderId, order);
      await updateOrderMeta(orderId, 'stripeReceiptUrl', receiptUrl);
    } catch (e) {
      console.error(e);
      return res.sendStatus(502);
    }
  }

  // Return a 200 success code to Stripe.
  res.sendStatus(200);
});

/**
 * Retrieve payment intent status
 */
router.get('/payment-intents/:id/status', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
  res.json({ paymentIntent: { status: paymentIntent.status } });
});

module.exports = router;
