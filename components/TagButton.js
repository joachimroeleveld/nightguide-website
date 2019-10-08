import React from 'react';

import colors from '../styles/colors';

function TagButton(props) {
  const { title, onClick, href } = props;
  const aProps = href ? { href } : { onClick };
  return (
    <React.Fragment>
      <a {...aProps}>{title}</a>
      {/*language=CSS*/}
      <style jsx>{`
        a {
          display: inline-block;
          padding: 0.05em 1em;
          text-decoration: none;
          border: 2px solid ${colors.tagButtonBorderColor};
          border-radius: 16px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s;
        }
        a:hover {
          background: #fff;
          border-color: #fff;
          color: ${colors.textDark};
        }
      `}</style>
    </React.Fragment>
  );
}

export default TagButton;
