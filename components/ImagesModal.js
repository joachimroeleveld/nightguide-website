import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import Modal from 'react-modal';
import css from 'styled-jsx/css';

import dimensions from '../styles/dimensions';
import ResponsiveImage from './ResponsiveImage';
import colors from '../styles/colors';
import {
  useDisableBodyScrolling,
  useElemDimensions,
  useOnClickOutside,
} from '../lib/hooks';

ImagesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ),
};

function ImagesModal(props) {
  const { images, isOpen, onClose, ...modalProps } = props;

  const [headerRef, setHeaderRef] = useState(null);
  const [imagesRef, setImagesRef] = useState(null);

  useDisableBodyScrolling(isOpen);

  useOnClickOutside([imagesRef, headerRef], onClose);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={modalStyles.className}
      className={modalStyles.className}
      {...modalProps}
    >
      <div className="container">
        <header className="header" ref={setHeaderRef}>
          <button className="close" onClick={onClose} />
        </header>
        <div className="content">
          <div className="images" ref={setImagesRef}>
            {images.map(({ url, width, height }) => (
              <div key={url} className="image">
                <ResponsiveImage
                  url={url}
                  width={width}
                  height={height}
                  widths={[600, 1000, 2000]}
                  sizes={`(max-width: 960px) calc(100vw - 2 * ${
                    dimensions.bodyPadding
                  }), calc(${dimensions.pageWidth} - 2 * ${
                    dimensions.bodyPadding
                  })`}
                />
              </div>
            ))}
          </div>
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
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          justify-content: center;
        }
        .images {
          width: 100%;
          padding: 1px 0;
          margin: 0 ${dimensions.bodyPadding};
          max-width: ${dimensions.pageWidth};
        }
        .image {
          margin: 1em 0;
          width: 100%;
          border-radius: 3px;
          overflow: hidden;
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

export default memo(ImagesModal);
