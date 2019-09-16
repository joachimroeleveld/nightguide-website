import React from 'react';

import TextStyles from './TextStyles';
import colors from './colors';

function GlobalStyles() {
  return (
    <React.Fragment>
      <TextStyles />
      {/*language=CSS*/}
      <style jsx global>{`
        #__next {
          position: relative;
          z-index: 0;
        }
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
          background-color: ${colors.bg};
          color: ${colors.text};
          scroll-behavior: smooth;
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
        ul,
        ol {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        button {
          border: none;
          background: none;
          padding: 0;
          font-size: 1em;
          color: inherit;
        }
        input {
          font-size: 1em;
          color: inherit;
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
