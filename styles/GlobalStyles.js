import React from 'react';

import TextStyles from './TextStyles';
import colors from './colors';

function GlobalStyles() {
  return (
    <React.Fragment>
      <TextStyles />
      {/*language=CSS*/}
      <style jsx global>{`
        html {
          font-family: sans-serif;
        }
        html.noto-sans {
          font-family: noto-sans, sans-serif;
        }
        body {
          margin: 0;
          font-weight: 400;
          font-style: normal;
          font-size: 16px;
          background-color: ${colors.bg};
          color: ${colors.text};
        }
        a {
          text-decoration: none;
        }
        a {
          color: inherit;
        }
        figure {
          margin: 0;
        }
      `}</style>
      {/*language=CSS*/}
      <style jsx global>{`
        #zsiqbtn {
          display: none !important;
        }
      `}</style>
    </React.Fragment>
  );
}

export default GlobalStyles;
