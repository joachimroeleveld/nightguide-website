import React from 'react';
import PropTypes from 'prop-types';
import __ from '../lib/i18n';
import colors from '../styles/colors';

SeeAllButton.propTypes = {
  count: PropTypes.number,
};

function SeeAllButton(props) {
  const { count, ...aProps } = props;
  return (
    <a {...aProps}>
      {__('SeeAllButton.seeAll') + (count ? ` (${count})` : '')}
      {/*language=CSS*/}
      <style jsx>{`
        a {
          background: url(/static/img/see-all-button.svg) no-repeat left center;
          color: ${colors.linkText};
          padding-left: 1em;
        }
      `}</style>
    </a>
  );
}

export default SeeAllButton;
