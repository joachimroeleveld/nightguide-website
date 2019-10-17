import PropTypes from 'prop-types';
import { Fragment, useState, useMemo, useEffect, memo } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import update from 'immutability-helper';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import { connect } from 'react-redux';
import { Link } from '../../routes';

import __ from '../../lib/i18n';
import { formatEventDate } from '../../lib/dates';
import BuyTicketButton from './BuyTicketButton';
import colors from '../../styles/colors';
import ResponsiveImage from '../ResponsiveImage';
import dimensions from '../../styles/dimensions';
import TicketUsps from './TicketUsps';
import TicketCart from './TicketCart';
import { formatAmount } from '../../lib/currencies';
import Select from '../Select';
import FormItem from '../FormItem';
import RadioButton from '../RadioButton';
import Spinner from '../Spinner';
import { classNames } from '../../lib/util';
import { useEffectSkipFirst } from '../../lib/hooks';

TicketForm.propTypes = {
  step: PropTypes.oneOf(['cart', 'checkout', 'result']),
  event: PropTypes.object.isRequired,
  onStepChange: PropTypes.func.isRequired,
  clientSecret: PropTypes.string,
  sourceId: PropTypes.string,
};

function TicketForm(props) {
  const {
    event,
    step = null,
    clientSecret = null,
    sourceId = null,
    stripe,
    onStepChange,
    currency,
  } = props;
  const { tickets } = event;

  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [cart, updateCart] = useState(
    tickets.products
      .map(({ id, name, price }, index) => ({
        sku: id,
        name,
        price,
        quantity: index === 0 ? 1 : 0,
      }))
      .concat({
        name: __('TicketForm.bookingFee'),
        price: 1.9,
        quantity: 1,
        mandatory: true,
      })
  );
  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [cart]
  );

  const noItemsInCart = !find(cart, item => !item.mandatory && item.quantity);

  // Restore values from localStorage
  useEffect(() => {
    const values = localStorage.getItem('formValues');
    if (values) {
      setValues(JSON.parse(values));
    }
  }, []);

  // Persist values to localstorage
  useEffect(() => {
    localStorage.setItem('formValues', JSON.stringify(values));
  }, [values]);

  // Reset payment method if country changes
  useEffectSkipFirst(() => {
    setValues({
      ...values,
      paymentMethod: null,
    });
  }, [values.country]);

  // Validate form values on change after submission
  useEffect(() => {
    if (submitted) {
      validate();
    }
  }, [submitted, values]);

  // Poll payment intent status if returning to this form from a redirect
  useEffect(() => {
    (async () => {
      if (step !== 'result') return;

      if (sourceId && clientSecret) {
        const { source } = await stripe.retrieveSource({
          id: sourceId,
          client_secret: clientSecret,
        });

        pollPaymentIntentStatus(source.metadata.paymentIntent);
      } else {
        onStepChange('checkout');
      }
    })();
  }, []);

  const onAdd = index =>
    updateCart(
      update(cart, {
        [index]: {
          quantity: { $set: cart[index].quantity + 1 },
        },
      })
    );
  const onRemove = index =>
    cart[index].quantity !== 0 &&
    updateCart(
      update(cart, {
        [index]: {
          quantity: { $set: cart[index].quantity - 1 },
        },
      })
    );

  const gotoNextStep = () => {
    if (step === 'cart') {
      onStepChange('checkout');
    } else if (step === 'checkout') {
      submit();
    }
  };

  const onInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/shop/payment-intents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          eventId: event.id,
        }),
      });
      const data = await response.json();
      if (data.error) {
        return { error: data.error };
      } else {
        return data.paymentIntent;
      }
    } catch (err) {
      return { error: err.message };
    }
  };

  const validate = () => {
    const errors = {
      city: !values.city,
      country: !values.country,
      address1: !values.address1,
      postalCode: !values.postalCode,
      state: values.country === 'US' && !values.state,
      email:
        !(values.email || '').match(/.+@.+/) &&
        __('TicketForm.enterValidEmail'),
      name: !values.name,
      paymentMethod: !values.paymentMethod,
      idealBank: values.paymentMethod === 'ideal' && !values.idealBank,
    };
    setFormErrors(errors);
    return !find(Object.values(errors), error => error);
  };

  const getRedirectUrl = () => {
    const redirectUrl = new URL(location.href);
    const search = new URLSearchParams();
    search.set('checkoutStep', 'result');
    redirectUrl.search = search;
    return redirectUrl.toString();
  };

  const submit = async () => {
    setSubmitted(true);

    if (isProcessing || !validate()) {
      return;
    }

    setIsProcessing(true);
    const paymentIntent = await createPaymentIntent();

    if (paymentIntent.error) {
      alert(`${__('TicketForm.somethingWentWrong')} (${paymentIntent.error})`);
    }

    if (values.paymentMethod === 'card') {
      // Let Stripe.js handle the confirmation of the PaymentIntent with the card Element.
      const response = await stripe.handleCardPayment(
        paymentIntent.client_secret,
        {
          payment_method_data: {
            billing_details: {
              address: {
                city: values.city,
                country: values.country,
                line1: values.address1,
                line2: values.address2,
                postal_code: values.postalCode,
                state: values.country === 'US' && values.state,
              },
              email: values.email,
              name: values.name,
            },
          },
        }
      );
      setPaymentResponse(response);
      onStepChange('result');
    } else if (values.paymentMethod === 'ideal') {
      const genericSourceData = {
        type: values.paymentMethod,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        owner: {
          name: values.name,
          email: values.email,
        },
        redirect: {
          return_url: getRedirectUrl(),
        },
        statement_descriptor: __('TicketForm.ticketsForEvent', {
          event: (event.facebook || {}).title || event.title,
        }),
        metadata: {
          paymentIntent: paymentIntent.id,
        },
      };
      const { source, error } = await stripe.createSource({
        ...genericSourceData,
        ideal: { bank: values.idealBank },
      });
      if (!error) {
        handleSourceActivation(source);
      } else {
        alert(`${__('TicketForm.somethingWentWrong')} (${error.message})`);
      }
    }

    setIsProcessing(false);
  };

  // Handle activation of payment sources not yet supported by PaymentIntents
  const handleSourceActivation = source => {
    switch (source.flow) {
      case 'redirect':
        window.location.replace(source.redirect.url);
        break;
    }
  };

  const pollPaymentIntentStatus = async (
    paymentIntent,
    timeout = 30000,
    interval = 500,
    start = null
  ) => {
    start = start ? start : Date.now();
    const endStates = ['succeeded', 'processing', 'canceled'];
    // Retrieve the PaymentIntent status from our server.
    const rawResponse = await fetch(
      `/api/shop/payment-intents/${paymentIntent}/status`
    );
    const response = await rawResponse.json();
    if (
      !endStates.includes(response.paymentIntent.status) &&
      Date.now() < start + timeout
    ) {
      // Not done yet. Let's wait and check again.
      setTimeout(
        pollPaymentIntentStatus,
        interval,
        paymentIntent,
        timeout,
        interval,
        start
      );
    } else {
      setPaymentResponse(response);
      if (!endStates.includes(response.paymentIntent.status)) {
        // Status has not changed yet. Let's time out.
        console.warn(new Error('Polling timed out.'));
      }
    }
  };

  const Footer = props => (
    <footer>
      <div className="usps">
        <TicketUsps />
      </div>
      <div className="button">
        <BuyTicketButton
          showSpinner={isProcessing}
          currency={currency}
          disabled={noItemsInCart}
          price={cartTotal}
          onClick={gotoNextStep}
        />
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        footer {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .usps {
          margin: 0 0 1em;
          padding-bottom: 1em;
          width: 100%;
          border-bottom: 1px solid ${colors.cardSeparator};
        }
        @media (max-width: 800px) {
          .button {
            width: 100%;
          }
          .button :global(button) {
            width: 100%;
          }
        }
        @media (min-width: 800px) {
          .button :global(button) {
            width: 20em;
          }
        }
      `}</style>
    </footer>
  );

  if (step === 'cart') {
    return (
      <div className="container">
        <Header event={event} />
        <h2>{__('TicketForm.cart')}</h2>
        <TicketCart
          currency={currency}
          cart={cart}
          onAdd={onAdd}
          onRemove={onRemove}
        />
        <div className="footer">
          <Footer />
        </div>
        {/*language=CSS*/}
        <style jsx>{`
          h2 {
            padding-top: 2rem;
            border-top: 1px solid ${colors.separator};
          }
          .container {
            padding-bottom: 12em;
          }
          .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            background: ${colors.cardBg};
            padding: 1em ${dimensions.bodyPadding};
            box-shadow: ${colors.cardShadow};
            box-sizing: border-box;
          }
          @media (min-width: 800px) {
            .footer {
              max-width: 45em;
            }
          }
          @media (max-width: 800px) {
            .footer {
              margin: 0 -${dimensions.bodyPadding};
            }
          }
        `}</style>
      </div>
    );
  }

  if (step === 'checkout') {
    return (
      <div className="container">
        <Header
          event={event}
          cart={cart}
          cartTotal={cartTotal}
          currency={currency}
        />
        <form noValidate>
          <section className="booking-details">
            <h2>{__('TicketForm.bookingDetails')}</h2>
            <fieldset>
              <FormItem
                label={__('TicketForm.name')}
                error={formErrors['name']}
              >
                <input
                  name="name"
                  onChange={onInputChange}
                  value={values.name}
                />
              </FormItem>
              <FormItem
                label={__('TicketForm.email')}
                error={formErrors['email']}
              >
                <input
                  name="email"
                  type="email"
                  onChange={onInputChange}
                  value={values.email}
                />
              </FormItem>
              <FormItem
                label={__('TicketForm.country')}
                error={formErrors['country']}
              >
                <Select
                  options={reduce(
                    COUNTRIES,
                    (options, label, value) => options.concat({ label, value }),
                    []
                  )}
                  name="country"
                  value={{
                    value: values.country,
                    label: COUNTRIES[values.country],
                  }}
                  onChange={({ value }) =>
                    setValues({ ...values, country: value })
                  }
                  placeholder={__('TicketForm.selectCountry')}
                />
              </FormItem>
            </fieldset>
          </section>
          <section className="payment-methods">
            <h2>{__('TicketForm.paymentMethod')}</h2>
            <ul>
              {Object.keys(PAYMENT_METHODS)
                .filter(
                  method =>
                    !PAYMENT_METHODS[method].countries ||
                    PAYMENT_METHODS[method].countries.includes(values.country)
                )
                .map(method => (
                  <li key={method} className={classNames(['method', method])}>
                    <label htmlFor={`payment-${method}`}>
                      {PAYMENT_METHODS[method].name}
                      <div className="radio">
                        <RadioButton
                          checked={values.paymentMethod === method}
                        />
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        id={`payment-${method}`}
                        checked={values.paymentMethod === method}
                        onChange={onInputChange}
                      />
                    </label>
                  </li>
                ))}
            </ul>
            <FormItem error={formErrors['paymentMethod']} />
          </section>
          {!!values.paymentMethod && (
            <section className="payment-details">
              <h2>{__('TicketForm.paymentDetails')}</h2>
              {values.paymentMethod === 'card' && (
                <fieldset>
                  <div className="address">
                    <FormItem
                      label={__('TicketForm.address')}
                      error={formErrors['address1']}
                    >
                      <input
                        name="address1"
                        onChange={onInputChange}
                        value={values.address1}
                      />
                    </FormItem>
                    <FormItem
                      label={__('TicketForm.address2')}
                      error={formErrors['address2']}
                    >
                      <input
                        name="address2"
                        onChange={onInputChange}
                        value={values.address2}
                      />
                    </FormItem>
                  </div>
                  <div className="city-zip">
                    <FormItem
                      label={__('TicketForm.city')}
                      error={formErrors['city']}
                    >
                      <input
                        name="city"
                        onChange={onInputChange}
                        value={values.city}
                      />
                    </FormItem>
                    <FormItem
                      label={
                        values.country === 'US'
                          ? __('TicketForm.zip')
                          : values.country === 'GB'
                          ? __('TicketForm.postCode')
                          : __('TicketForm.postalCode')
                      }
                      error={formErrors['postalCode']}
                    >
                      <input
                        name="postalCode"
                        onChange={onInputChange}
                        value={values.postalCode}
                      />
                    </FormItem>
                  </div>
                  {values.country === 'US' && (
                    <FormItem
                      label={__('TicketForm.state')}
                      error={formErrors['state']}
                    >
                      <input
                        name="state"
                        onChange={onInputChange}
                        value={values.state}
                      />
                    </FormItem>
                  )}
                  <FormItem label={__('TicketForm.cardDetails')}>
                    <div className="elem-wrapper">
                      <CardElement style={stripeElemStyles} />
                    </div>
                  </FormItem>
                </fieldset>
              )}
              {values.paymentMethod === 'ideal' && (
                <FormItem
                  label={__('TicketForm.bank')}
                  error={formErrors['idealBank']}
                >
                  <Select
                    options={reduce(
                      IDEAL_BANKS,
                      (options, label, value) =>
                        options.concat({ label, value }),
                      []
                    )}
                    name="ideal_bank"
                    value={{
                      value: values.idealBank,
                      label: IDEAL_BANKS[values.idealBank],
                    }}
                    onChange={({ value }) =>
                      setValues({ ...values, idealBank: value })
                    }
                    placeholder={__('TicketForm.selectBank')}
                  />
                </FormItem>
              )}
            </section>
          )}
        </form>
        <div className="footer">
          <Footer />
        </div>
        {/*language=CSS*/}
        <style jsx>{`
          .footer {
            border-top: 1px solid ${colors.separator};
            padding-top: 1em;
            margin: 3em 0 3em;
          }
          .footer :global(.usps) {
            border-color: ${colors.separator};
          }
          .elem-wrapper {
            height: 2.25em;
            padding: 0 0.5em;
            border-radius: ${dimensions.inputRadius};
            background: ${colors.inputBg};
            display: flex;
            align-items: center;
          }
          .elem-wrapper > :global(div) {
            flex-basis: 100%;
          }
          section {
            padding: 1.5em 0 0;
            margin: 1.5em 0;
            border-top: 1px solid ${colors.separator};
          }
          h2 {
            margin: 0 0 1.5em;
          }
          .booking-details input,
          .payment-details input {
            width: 100%;
            box-sizing: border-box;
          }
          .payment-methods .method label {
            display: block;
            padding: 0.6em 1em 2.5em;
            border: 1px solid ${colors.separator};
            border-radius: 3px;
            position: relative;
            margin: 1em 0;
            background: #272727 no-repeat left 1em bottom 1em;
          }
          .payment-methods {
            margin-top: 0;
            background: no-repeat right top 1.5em
              url(/static/img/processed-by-stripe.svg);
          }
          fieldset {
            margin-top: -1em;
          }
          .address,
          .city-zip {
            margin: 0 0 -1em;
            display: grid;
            grid-template-columns: 2fr 1fr;
            grid-gap: 1em;
          }
          .payment-methods .method input {
            display: none;
          }
          .payment-methods .radio {
            position: absolute;
            right: 1em;
            top: 1em;
          }
          .payment-methods .method input {
            display: none;
          }
          .payment-methods .ideal label {
            background-image: url(/static/img/ideal.png);
          }
          .payment-methods .card label {
            background-image: url(/static/img/supported-cards.png);
          }
        `}</style>
      </div>
    );
  }

  if (step === 'result') {
    const { paymentIntent = {}, error = {} } = paymentResponse || {};
    const status = ['canceled', 'succeeded'].includes(paymentIntent.status)
      ? paymentIntent.status
      : 'error';

    return (
      <div className={classNames(['container', status])}>
        <Header
          event={event}
          cart={cart}
          cartTotal={cartTotal}
          currency={currency}
        />
        <div className="inner">
          {!paymentResponse && (
            <p className="processing">
              <span className="info">
                {__('TicketForm.verifyingOrderStatus')}
              </span>
              <Spinner center={true} />
            </p>
          )}
          {paymentResponse && (
            <p className="status">
              <h2>{__(`TicketForm.orderStatusTitles.${status}`)}</h2>
              {__(`TicketForm.orderStatusMessages.${status}`)}
              {status === 'canceled' && (
                <button onClick={() => onStepChange('checkout')}>
                  {__('TicketForm.goBack')}
                </button>
              )}
              {status === 'error' && (
                <Link route="help-center">
                  <a>{__('TicketForm.contactUs')}</a>
                </Link>
              )}
              {error && error.message && (
                <div className="error">
                  <span className="label">{__('TicketForm.errorMessage')}</span>
                  <span className="message">{error.message}</span>
                </div>
              )}
            </p>
          )}
        </div>
        {/*language=CSS*/}
        <style jsx>{`
          .inner {
            margin: 2em 0;
            border-top: 1px solid ${colors.separator};
            padding-top: 2em;
          }
          .status {
            padding: 0 2em 0 5em;
            position: relative;
          }
          .status::before {
            content: '';
            position: absolute;
            top: 3.375em;
            left: 1em;
            display: block;
            width: 2em;
            height: 2em;
            border-radius: 2em;
          }
          .succeeded .status::before {
            background-color: #6ac259;
          }
          .error .status::before {
            background-color: #c25959;
          }
          .canceled .status::before {
            background-color: #c2b459;
          }
          button,
          a {
            display: block;
            margin: 1em 0;
            color: ${colors.linkText};
            text-decoration: underline;
          }
          .error {
            margin-top: 1em;
          }
          .error .message {
            display: block;
            font-size: 0.8em;
          }
          .processing .info {
            display: block;
            text-align: center;
            margin-bottom: 1em;
          }
        `}</style>
      </div>
    );
  }

  return null;
}

// Prevent rerendering of header image
const Header = memo(({ event, cart, cartTotal, currency }) => (
  <header className="container">
    {!!event.images.length && (
      <div className="img">
        <ResponsiveImage
          url={event.images[0].url}
          widths={[300]}
          sizes={'5em'}
          lazy={false}
        />
      </div>
    )}
    <div className="text">
      <strong className="title">
        {(event.facebook || {}).title || event.title}
      </strong>
      <span>{formatEventDate(event.dates[0].from, event.dates[0].to)}</span>
      {cart && (
        <Fragment>
          <span className="items">
            {cart
              .filter(item => !item.mandatory)
              .map(({ name, quantity }) => `${quantity} ${name}`)
              .join(', ')}
          </span>
          <strong className="total">{formatAmount(cartTotal, currency)}</strong>
        </Fragment>
      )}
    </div>
    {/*language=CSS*/}
    <style jsx>{`
      .container {
        display: flex;
        margin: 2em 0;
      }
      .title {
        display: block;
      }
      .img {
        margin-right: 1em;
      }
      .img :global(picture) {
        width: 5em;
        height: 5em;
      }
      .items,
      .total {
        display: block;
      }
    `}</style>
  </header>
));

const stripeElemStyles = {
  base: {
    iconColor: '#fff',
    color: colors.text,
    fontWeight: 400,
    fontSize: '14px',
    '::placeholder': {
      color: colors.placeholderColor,
    },
    ':-webkit-autofill': {
      color: '#dde8a0',
    },
    ':focus': {
      border: '1px solid green',
    },
  },
};

const PAYMENT_METHODS = {
  card: {
    name: 'Card',
    flow: 'none',
  },
  ideal: {
    name: 'iDEAL',
    flow: 'redirect',
    countries: ['NL'],
    currencies: ['eur'],
  },
};

const COUNTRIES = {
  AU: 'Australia',
  AT: 'Austria',
  BE: 'Belgium',
  BR: 'Brazil',
  CA: 'Canada',
  CN: 'China',
  DK: 'Denmark',
  FI: 'Finland',
  FR: 'France',
  DE: 'Germany',
  HK: 'Hong Kong',
  IE: 'Ireland',
  IT: 'Italy',
  JP: 'Japan',
  LU: 'Luxembourg',
  MY: 'Malaysia',
  MX: 'Mexico',
  NL: 'Netherlands',
  NZ: 'New Zealand',
  NO: 'Norway',
  PT: 'Portugal',
  SG: 'Singapore',
  ES: 'Spain',
  SE: 'Sweden',
  CH: 'Switzerland',
  GB: 'United Kingdom',
  US: 'United States',
};

// https://stripe.com/docs/sources/ideal#specifying-customer-bank
const IDEAL_BANKS = {
  abn_amro: 'ABN AMRO',
  asn_bank: 'ASN Bank',
  bunq: 'Bunq',
  handelsbanken: 'Handelsbanken',
  ing: 'ING',
  knab: 'Knab',
  moneyou: 'Moneyou',
  rabobank: 'Rabobank',
  regiobank: 'RegioBank',
  sns_bank: 'SNS Bank (De Volksbank)',
  triodos_bank: 'Triodos Bank',
  van_lanschot: 'Van Lanschot',
};

export default connect(state => ({
  currency: state.shop.currency,
}))(injectStripe(TicketForm));
