import React from 'react';
import Link from 'next/link';

import colors from '../styles/colors';

function CityTitleButton(props) {
  const { city, href } = props;
  return (
    <React.Fragment>
      <Link href={href}>
        <a>{city}</a>
      </Link>
      {/*language=CSS*/}
      <style jsx>{`
        a {
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
