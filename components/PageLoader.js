import { useEffect, useState } from 'react';
import Spinner from './Spinner';

import Router from 'next/router';

function PageLoader(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', routeChangeStart);
    return () => Router.events.off('routeChangeStart', routeChangeStart);
  });

  useEffect(() => {
    Router.events.on('routeChangeComplete', routeChangeEnd);
    return () => Router.events.off('routeChangeComplete', routeChangeEnd);
  });

  useEffect(() => {
    Router.events.on('routeChangeError', routeChangeEnd);
    return () => Router.events.off('routeChangeError', routeChangeEnd);
  });

  const routeChangeStart = () => {
    setShow(true);
  };

  const routeChangeEnd = () => {
    setShow(false);
  };

  return (
    <div className={['container', show ? 'show' : ''].join(' ')}>
      <Spinner size={30} />
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          pointer-events: none;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(31, 31, 31, 0.9);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .container.show {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default PageLoader;
