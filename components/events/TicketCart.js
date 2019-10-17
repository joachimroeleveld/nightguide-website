import PropTypes from 'prop-types';

import colors from '../../styles/colors';
import { formatAmount } from '../../lib/currencies';

TicketCart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      mandatory: PropTypes.bool,
    })
  ),
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
};

function TicketCart(props) {
  const { cart, onAdd, onRemove, currency } = props;

  return (
    <ul>
      {cart.map(({ name, price, quantity, mandatory }, index) => (
        <li className="item" key={name}>
          <div className="text">
            {!mandatory && <span className="quantity">{`${quantity}x`}</span>}
            <span className="name">{name}</span>
            <span className="price">{formatAmount(price, currency)}</span>
          </div>
          {!mandatory && (
            <div className="buttons">
              <button onClick={() => onRemove(index)} className="min">
                {'-'}
              </button>
              <button onClick={() => onAdd(index)} className="plus">
                {'+'}
              </button>
            </div>
          )}
        </li>
      ))}
      {/*language=CSS*/}
      <style jsx>{`
        .price {
          display: block;
          color: ${colors.textSecondary};
        }
        .quantity {
          margin-right: 0.5em;
        }
        .name {
          font-weight: 600;
        }
        .buttons {
          display: flex;
          border: 1px solid ${colors.secondaryButtonBorder};
          border-radius: 3px;
        }
        .min,
        .plus {
          width: 2.2em;
          height: 1.8em;
        }
        .min {
          border-right: 1px solid ${colors.secondaryButtonBorder};
        }
        .item {
          display: flex;
          align-items: center;
          padding: 0.8em 0;
        }
        .item:not(:last-child) {
          border-bottom: 1px solid ${colors.separator};
        }
        .item .text {
          flex-grow: 1;
        }
      `}</style>
    </ul>
  );
}

export default TicketCart;
