import React from 'react';

import colors from '../styles/colors';

function SecondaryButton(props) {
  const {
    title,
    onClick,
    active,
    href,
    className,
    styles,
    ...otherProps
  } = props;
  const aProps = {
    ...otherProps,
    ...(href ? { href } : { onClick }),
  };
  return (
    <React.Fragment>
      <a
        {...aProps}
        className={['button', active ? 'active' : '', className].join(' ')}
      >
        {title}
      </a>
      {styles}
      {/*language=CSS*/}
      <style jsx>{`
        a {
          display: inline-block;
          padding: 0.15em 0.7em;
          text-align: center;
          cursor: pointer;
          border-radius: 3px;
          border: 1px solid ${colors.secondaryButtonBorder};
          transition: all 0.2s;
          background-repeat: no-repeat;
        }
        a.active {
          background-color: #fff;
          border-color: #fff;
          color: ${colors.textDark};
        }
      `}</style>
    </React.Fragment>
  );
}

export default SecondaryButton;
