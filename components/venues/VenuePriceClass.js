import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import colors from '../../styles/colors';

export default function VenuePriceClass({ priceClass }) {
  return (
    <div className={'container'}>
      {range(1, 5).map(currentPriceClass => (
        <span
          key={currentPriceClass}
          className={currentPriceClass > priceClass && 'inactive'}
        >
          {'€'}
        </span>
      ))}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: flex;
        }
        span {
          display: inline-block;
        }
        .inactive {
          color: ${colors.textSecondary};
        }
      `}</style>
    </div>
  );
}

VenuePriceClass.propTypes = {
  priceClass: PropTypes.number.isRequired,
};
