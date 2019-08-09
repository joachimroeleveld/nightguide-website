import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import Modal from 'react-modal';
import css from 'styled-jsx/css';

import colors from '../../styles/colors';
import { useDisableBodyScrolling } from '../../lib/hooks';
import { EventPage } from '../../pages/event';
import Spinner from '../Spinner';
import dimensions from '../../styles/dimensions';

EventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired,
  pageSlug: PropTypes.string.isRequired,
};

function EventModal(props) {
  const {
    eventId,
    dateIndex,
    isOpen,
    onClose,
    pageSlug,
    routeParams,
    ...modalProps
  } = props;

  const [eventLoading, setEventLoading] = useState(true);
  const [eventPageProps, setEventPageProps] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      try {
        const props = await EventPage.getInitialProps({
          query: {
            event: eventId,
            pageSlug,
          },
        });
        setEventPageProps({
          ...props,
          query: { dateIndex },
          routeParams,
        });
      } finally {
        setEventLoading(false);
      }
    })();
  }, [isOpen]);

  useDisableBodyScrolling(isOpen);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={modalStyles.className}
      className={modalStyles.className}
      {...modalProps}
    >
      <div className="container">
        <header className="header">
          <button className="close" onClick={onClose} />
        </header>
        <div className="content">
          {eventLoading && (
            <div className="spinner">
              <Spinner />
            </div>
          )}
          {!!eventPageProps && (
            <div className="page">
              <EventPage {...eventPageProps} />
            </div>
          )}
        </div>
      </div>
      {modalStyles.styles}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          height: 100%;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 3em;
          width: 100%;
          box-shadow: ${colors.headerShadow};
        }
        .content {
          height: calc(100% - 3em);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          justify-content: center;
        }
        .page {
          margin-top: -1em;
          padding: 0 ${dimensions.bodyPadding};
          width: 100vw;
          box-sizing: border-box;
        }
        .page > :global(main) {
          padding-bottom: 3em;
        }
        .spinner {
          padding: 2em;
        }
        .close {
          width: 32px;
          height: 32px;
          padding: 1em;
          margin-right: 1em;
          background: url(/static/img/close.svg) no-repeat center center;
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

export default memo(EventModal);
