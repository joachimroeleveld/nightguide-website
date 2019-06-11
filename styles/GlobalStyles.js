import React, { useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';

import TextStyles from './TextStyles';
import colors from './colors';

function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://use.typekit.net/adw5jeb.css';
    link.rel = 'stylesheet';

    document.head.appendChild(link);

    const showFont = () => document.documentElement.classList.add('noto-sans');

    if (!localStorage.getItem('noto-sans-loaded')) {
      const notoSans = new FontFaceObserver('noto-sans');

      notoSans.load().then(() => {
        localStorage.setItem('noto-sans-loaded', '1');
        showFont();
      });
    } else {
      showFont();
    }
  });

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
