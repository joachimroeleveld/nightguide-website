import React from 'react';
import Link from 'next/link';

import colors from '../styles/colors';

function CityTitleButton(props) {
  const { city, href, disabled = false } = props;
  return (
    <React.Fragment>
      {!disabled && (
        <Link href={href}>
          <a className="button">{city}</a>
        </Link>
      )}
      {disabled && <span className="button">{city}</span>}
      {/*language=CSS*/}
      <style jsx>{`
        .button {
          border: 2px solid ${colors.tagButtonBorderColor};
          border-radius: 10px;
          padding: 0 0.3em;
          margin: 0 0.15em;
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

export default CityTitleButton;
