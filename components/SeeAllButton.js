import React from 'react';
import PropTypes from 'prop-types';
import __ from '../lib/i18n';
import colors from '../styles/colors';

SeeAllButton.propTypes = {
  count: PropTypes.number,
  title: PropTypes.string,
};

function SeeAllButton(props) {
  const { count, title, ...aProps } = props;
  return (
    <a {...aProps}>
      {(title || __('SeeAllButton.seeAll')) + (count ? ` (${count})` : '')}
      {/*language=CSS*/}
      <style jsx>{`
        @media (max-width: 800px) {
          a {
            display: block;
            border: 2px solid #686868;
            padding: 0.5em 2em;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            border-radius: 3px;
            margin: 1em 0 0;
          }
        }
        @media (min-width: 800px) {
          a {
            display: block;
            color: ${colors.linkText};
            background: url(/static/img/see-all-button.svg) no-repeat left
              center;
            padding-left: 0.8em;
            margin: 1em 0;
          }
        }
      `}</style>
    </a>
  );
}

export default SeeAllButton;
