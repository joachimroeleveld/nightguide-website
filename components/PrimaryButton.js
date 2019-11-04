import React from 'react';
import PropTypes from 'prop-types';

import colors from '../styles/colors';
import { classNames } from '../lib/util';

PrimaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
};

function PrimaryButton(props) {
  const { title, onClick, href, disabled, iconSrc, ...otherProps } = props;
  const aProps = {
    ...otherProps,
    ...(!disabled ? (href ? { href } : { onClick }) : {}),
  };
  return (
    <a className={classNames(['button', disabled && 'disabled'])} {...aProps}>
      <span>
        {iconSrc && <img src={iconSrc} className="icon" />}
        {title}
      </span>
      {/*language=CSS*/}
      <style jsx>{`
        a {
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
          transition: transform 0.3s;
        }
        a > span {
          display: flex;
          align-items: center;
        }
        .icon {
          margin-right: 1em;
        }
        .disabled {
          opacity: 0.4;
          cursor: default;
        }
      `}</style>
    </a>
  );
}

export default PrimaryButton;
