import PropTypes from 'prop-types';
import { memo } from 'react';
import Modal from 'react-modal';
import css from 'styled-jsx/css';

import __ from '../lib/i18n';
import colors from '../styles/colors';
import { useDisableBodyScrolling } from '../lib/hooks';
import dimensions from '../styles/dimensions';

FilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function FilterModal(props) {
  const { children, onClear, isOpen, label, onClose, ...modalProps } = props;

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
          <button className="close" onClick={() => onClose()} />
          <span className="title">{__('FilterModal.filters')}</span>
          {onClear && (
            <button className="clear" onClick={() => onClear()}>
              {__('FilterModal.clear')}
            </button>
          )}
        </header>
        <div className="content">
          <strong className="label">{label}</strong>
          {children}
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
          box-sizing: border-box;
          box-shadow: ${colors.headerShadow};
          padding: 0 ${dimensions.bodyPadding};
          position: relative;
        }
        .title {
          flex-grow: 1;
          text-align: center;
          font-size: 0.92em;
        }
        .content {
          height: calc(100% - 3em);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: ${dimensions.bodyPadding};
        }
        .label {
          display: block;
          margin-bottom: 0.5em;
        }
        .close {
          position: absolute;
          left: ${dimensions.bodyPadding};
          width: 1em;
          height: 1em;
          padding: 0.5em;
          margin-right: 1em;
          background: url(/static/img/close.svg) no-repeat center center;
          background-size: cover;
        }
        .clear {
          position: absolute;
          color: ${colors.linkText};
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

export default memo(FilterModal);
