import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import Modal from 'react-modal';
import css from 'styled-jsx/css';
import { withRouter } from 'next/router';

import colors from '../styles/colors';
import Spinner from './Spinner';
import dimensions from '../styles/dimensions';

PageModal.propTypes = {
  PageComponent: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  openCloseCb: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

function PageModal(props) {
  const { url, PageComponent, isOpen, openCloseCb, router } = props;

  const [pageLoading, setPageLoading] = useState(false);
  const [pageProps, setPageProps] = useState(null);

  useEffect(() => {
    openCloseCb(url === router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      setPageLoading(true);
      try {
        const props = await PageComponent.getInitialProps();
        setPageProps(props);
      } finally {
        setPageLoading(false);
      }
    })();
  }, []);

  const close = () => openCloseCb(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      overlayClassName={modalStyles.className}
      className={modalStyles.className}
    >
      <div className="content">
        <div className="header">
          <button className="back" onClick={close} />
        </div>
        {pageLoading && (
          <div className="spinner">
            <Spinner />
          </div>
        )}
        {pageProps && (
          <div className="page">
            <PageComponent {...pageProps} />
          </div>
        )}
      </div>
      {modalStyles.styles}
      {/*language=CSS*/}
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          height: 3em;
          width: 100%;
          box-shadow: ${colors.headerShadow};
        }
        .content {
          height: calc(100% - 3em);
          width: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          justify-content: center;
        }
        .back {
          width: 9px;
          height: 16px;
          padding: 1em;
          margin-left: 1em;
          background: url(/static/img/modal-back.svg) no-repeat center center;
        }
        .spinner {
          display: flex;
          justify-content: center;
          padding: 2em;
        }
        .page {
          padding: 0 ${dimensions.bodyPadding};
        }
      `}</style>
    </Modal>
  );
}

/*language=CSS*/
const modalStyles = css.resolve`
  .ReactModal__Overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${colors.bg};
  }
  .ReactModal__Content {
      height: 100%;
      width: 100%;
      outline: none;
      WebkitOverflowScrolling: touch;
  }
`;

export default withRouter(memo(PageModal));
