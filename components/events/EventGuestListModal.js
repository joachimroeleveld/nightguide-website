import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import Modal from 'react-modal';
import css from 'styled-jsx/css';

import __, { _o } from '../../lib/i18n';
import dimensions from '../../styles/dimensions';
import colors from '../../styles/colors';
import { useDisableBodyScrolling } from '../../lib/hooks';
import EmailForm from '../EmailForm';

EventGuestListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

function EventGuestListModal(props) {
  const { event, isOpen, onClose, ...modalProps } = props;

  const [loading, setLoading] = useState(false);

  useDisableBodyScrolling('EventGuestListModal', isOpen);

  const onSubmit = async values => {
    setLoading(true);

    try {
      const response = await fetch('/api/mails/guest-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          eventId: event.id,
        }),
      });
      const data = await response.json();
      if (data.error) {
        return { error: data.error };
      } else {
        return data.paymentIntent;
      }
    } catch (err) {
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

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
          <h1>
            {__('EventGuestListModal.title', {
              venue: event.organiser.venue.name,
            })}
          </h1>
          <p>{_o(event.tickets.guestListInfo)}</p>
          <EmailForm
            onSubmit={onSubmit}
            submitButtonText={__('EventGuestListModal.joinGuestList')}
            showProgress={loading}
          />
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
          width: 100%;
          box-sizing: border-box;
          padding: 2em ${dimensions.bodyPadding};
          max-width: ${dimensions.pageWidth};
          margin: 0 auto;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .close {
          width: 1em;
          height: 1em;
          padding: 0.5em;
          background-size: cover;
          margin-right: ${dimensions.bodyPadding};
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

export default memo(EventGuestListModal);
