import React from 'react';

import colors from '../styles/colors';

function SecondaryButton(props) {
  const { title, onClick, href, ...otherProps } = props;
  const aProps = {
    ...otherProps,
    ...(href ? { href } : { onClick }),
  };
  return (
    <React.Fragment>
      <a {...aProps}>{title}</a>
      {/*language=CSS*/}
      <style jsx>{`
        a {
          display: inline-block;
          padding: 0.3em 0.6em;
          text-align: center;
          cursor: pointer;
          border-radius: 3px;
          border-color: ${colors.secondaryButtonBorder};
        }
      `}</style>
    </React.Fragment>
  );
}

export default SecondaryButton;
