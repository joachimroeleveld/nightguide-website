import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import __ from '../../lib/i18n';
import colors from '../../styles/colors';
import { formatAmount } from '../../lib/currencies';
import { classNames } from '../../lib/util';
import Spinner from '../Spinner';

BuyTicketButton.propTypes = {
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  showSpinner: PropTypes.bool,
};

function BuyTicketButton(props) {
  const {
    showSpinner = false,
    price,
    onClick,
    disabled,
    title = __('BuyTicketButton.buyTickets'),
    currency,
  } = props;

  return (
    <React.Fragment>
      <button
        className={classNames(['button', disabled && 'disabled'])}
        onClick={onClick}
      >
        {showSpinner && <Spinner size={16} center={true} />}
        {!showSpinner && (
          <Fragment>
            <span className="title">{title}</span>
            <span className="price">
              {formatAmount(price, currency, 2, true)}
            </span>
          </Fragment>
        )}
      </button>
      {/*language=CSS*/}
      <style jsx>{`
        button {
          display: flex;
          justify-content: center;
          padding: 0.5em 1em;
          text-align: center;
          background: ${colors.primaryButton};
          color: ${colors.textDark};
          text-decoration: none;
          border-radius: 20px;
          box-shadow: 1px 1px 0 0 #000000;
          cursor: pointer;
          transition: transform 0.3s, opacity 0.3s;
        }
        .title {
          padding-right: 0.6em;
        }
        .price {
          font-weight: 600;
        }
        .disabled {
          opacity: 0.4;
        }
      `}</style>
    </React.Fragment>
  );
}

export default BuyTicketButton;
