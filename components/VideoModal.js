import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import Modal from 'react-modal';
import css from 'styled-jsx/css';
import ReactPlayer from 'react-player';

import dimensions from '../styles/dimensions';

/*language=CSS*/
const modalStyles = css.resolve`
  .ReactModal__Overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.75);
  }
  .ReactModal__Content {
      height: 100%;
      margin: 0 auto;
      padding: 0 2em;
      max-width: ${dimensions.pageWidth};
      overflow: auto;
      outline: none;
      WebkitOverflowScrolling: touch;
  }
`;

function VideoModal(props) {
  const { url, isOpen, onClose, ...modalProps } = props;

  const [contentContainerRef, setContentContainerRef] = useState(null);
  const [contentWidth, setContentWidth] = useState(320);

  useEffect(() => {
    const resizeListener = debounce(() => {
      if (contentContainerRef) {
        setContentWidth(contentContainerRef.getBoundingClientRect().width);
      }
    }, 100);
    window.addEventListener('resize', resizeListener);
    resizeListener();
    return () => window.removeEventListener('resize', resizeListener);
  }, [contentContainerRef]);

  const videoHeight = (contentWidth / 16) * 9;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={modalStyles.className}
      className={modalStyles.className}
      {...modalProps}
    >
      <div className="content" ref={setContentContainerRef} onClick={onClose}>
        <button className="close" onClick={onClose} />
        <ReactPlayer
          width={contentWidth}
          height={videoHeight}
          controls={true}
          url={url}
          onEnded={onClose}
          playing
        />
      </div>
      {modalStyles.styles}
      {/*language=CSS*/}
      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
          width: 100%;
        }
        .close {
          width: 32px;
          height: 32px;
          margin-bottom: 0.5em;
          background: url(/static/img/video-close.svg) no-repeat center center;
        }
      `}</style>
    </Modal>
  );
}

VideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(VideoModal);
