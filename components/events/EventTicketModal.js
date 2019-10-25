import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import Modal from 'react-modal';
import css from 'styled-jsx/css';
import { Elements, StripeProvider } from 'react-stripe-elements';

import __ from '../../lib/i18n';
import colors from '../../styles/colors';
import { useDisableBodyScrolling } from '../../lib/hooks';
import dimensions from '../../styles/dimensions';
import TicketForm from './TicketForm';
import Spinner from '../Spinner';

const STRIPE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

EventTicketModal.propTypes = {
  step: PropTypes.oneOf(['cart', 'checkout', 'result']),
  onStepChange: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  clientSecret: PropTypes.string,
  sourceId: PropTypes.string,
};

function EventTicketModal(props) {
  const {
    step = null,
    sourceId,
    clientSecret,
    onStepChange,
    event,
    ...modalProps
  } = props;

  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    if (step === null) return;

    if (!window.Stripe) {
      let stripeScript = document.createElement('script');
      stripeScript.setAttribute('id', 'stripe-js');
      stripeScript.type = 'text/javascript';
      stripeScript.async = true;
      stripeScript.src = 'https://js.stripe.com/v3/';
      stripeScript.onload = () => {
        setStripe(window.Stripe(STRIPE_KEY));
      };
      document.getElementsByTagName('head')[0].appendChild(stripeScript);
    } else {
      setStripe(window.Stripe(STRIPE_KEY));
    }

    return () => {
      if (document.getElementById('stripe-js')) {
        document.getElementById('stripe-js').remove();
      }
    };
  }, [step]);

  useDisableBodyScrolling(EventTicketModal.name, step !== null);

  return (
    <Modal
      isOpen={step !== null}
      overlayClassName={modalStyles.className}
      className={modalStyles.className}
      {...modalProps}
    >
      <div className="container">
        <header className="header">
          {step === 'checkout' && (
            <button className="back" onClick={() => onStepChange('cart')} />
          )}
          {step !== 'checkout' && (
            <button className="close" onClick={() => onStepChange(null)} />
          )}
          <span className="title">{__(`EventTicketModal.titles.${step}`)}</span>
        </header>
        <div className="content">
          {!stripe && <Spinner style={{ margin: '2em' }} />}
          {stripe && (
            <div className="form">
              <StripeProvider stripe={stripe}>
                <Elements
                  fonts={[{ cssSrc: 'https://use.typekit.net/adw5jeb.css' }]}
                >
                  <TicketForm
                    step={step}
                    event={event}
                    onStepChange={onStepChange}
                    sourceId={sourceId}
                    clientSecret={clientSecret}
                  />
                </Elements>
              </StripeProvider>
            </div>
          )}
        </div>
      </div>
      {modalStyles.styles}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 3em;
          min-height: 3em;
          width: 100%;
          box-sizing: border-box;
          box-shadow: ${colors.headerShadow};
          padding: 0 ${dimensions.bodyPadding};
          position: relative;
        }
        .title {
          flex-grow: 1;
          text-align: center;
          font-size: 0.92em;
        }
        .content {
          flex-grow: 1;
          width: 100%;
          display: flex;
          justify-content: center;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .form {
          width: 100%;
          margin: 0 ${dimensions.bodyPadding};
        }
        .back {
          position: absolute;
          left: ${dimensions.bodyPadding};
          width: 1em;
          height: 1em;
          padding: 0.5em;
          margin-right: 1em;
          background: url(/static/img/modal-back.svg) no-repeat center center;
          background-size: contain;
        }
        .close {
          position: absolute;
          right: ${dimensions.bodyPadding};
          width: 1em;
          height: 1em;
          padding: 0.5em;
          margin-right: 1em;
          background: url(/static/img/close.svg) no-repeat center center;
          background-size: contain;
        }
        @media (min-width: 800px) {
          .form {
            max-width: 45em;
          }
        }
      `}</style>
    </Modal>
  );
}

/*language=CSS*/
const modalStyles = css.resolve`
  .ReactModal__Overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${colors.bg};
  }
  .ReactModal__Content {
      height: 100%;
      width: 100%;
      outline: none;
      WebkitOverflowScrolling: touch;
  }
`;

export default memo(EventTicketModal);
