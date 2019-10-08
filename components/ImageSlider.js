import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import Swipe from 'react-easy-swipe';

import ResponsiveImage from './ResponsiveImage';
import Pager from './Pager';
import colors from '../styles/colors';
import { TileButton } from './TileButton';
import ImagesModal from './ImagesModal';
import { useElemDimensions, useToggleState } from '../lib/hooks';

const SWIPE_TOLERANCE = 30;

ImageSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ).isRequired,
  showMaximize: PropTypes.bool,
  imgWidths: PropTypes.arrayOf(PropTypes.number).isRequired,
  imgSizes: PropTypes.string,
};

function ImageSlider(props) {
  const { slides, showMaximize = true, imgWidths, imgSizes } = props;

  if (!slides.length) {
    return null;
  }

  const getOffsetForSlide = slide =>
    -slide * (containerDimensions ? containerDimensions.width : 0);

  const [containerRef, setContainerRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [isImageModalOpen, toggleIsImageModalOpen] = useToggleState(false);
  const offsetX = useRef(0);
  const containerDimensions = useElemDimensions(containerRef);

  // Adjust translation to slide
  useEffect(() => {
    setTranslateX(getOffsetForSlide(currentSlide));
  }, [currentSlide]);

  const goToSlide = slide => {
    if (slide === slides.length || slide < 0) return;
    setCurrentSlide(slide);
  };

  const onSwipeEnd = () => {
    if (offsetX.current === null) return;

    setSwiping(false);

    let newSlide;
    if (offsetX.current < 0) {
      newSlide = currentSlide + 1;
    } else {
      newSlide = currentSlide - 1;
    }

    offsetX.current = null;

    if (newSlide < 0 || newSlide > slides.length - 1) {
      return setTranslateX(getOffsetForSlide(currentSlide));
    }

    goToSlide(newSlide);
  };

  const onSwipeMove = pos => {
    const { x } = pos;
    if (Math.abs(x) > SWIPE_TOLERANCE) {
      setSwiping(true);
      offsetX.current = x;
      setTranslateX(getOffsetForSlide(currentSlide) + x);
      return true;
    }
  };

  return (
    <React.Fragment>
      <Swipe
        style={{ height: '100%' }}
        allowMouseEvents={true}
        onSwipeMove={onSwipeMove}
        onSwipeEnd={onSwipeEnd}
      >
        <div
          style={{ pointerEvents: swiping ? 'none' : 'auto' }}
          className="container"
          ref={setContainerRef}
        >
          {!!containerDimensions && (
            <div
              className="carousel"
              style={{ width: containerDimensions.width }}
            >
              <div className="prev">
                <button onClick={() => goToSlide(currentSlide - 1)} />
              </div>
              {showMaximize && (
                <div className="maximize-button">
                  <TileButton
                    onClick={toggleIsImageModalOpen}
                    iconSrc={'/static/img/tile-maximize.svg'}
                  />
                  <ImagesModal
                    onClose={toggleIsImageModalOpen}
                    isOpen={isImageModalOpen}
                    images={slides}
                  />
                </div>
              )}
              <div
                className="slides"
                style={{
                  gridTemplateColumns: `${containerDimensions.width}px `.repeat(
                    slides.length
                  ),
                  width: containerDimensions.width * slides.length,
                  height: containerDimensions.height,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                {slides.map(({ width, height, url }) => (
                  <div key={url} className="slide">
                    <ResponsiveImage
                      widths={imgWidths}
                      sizes={imgSizes}
                      url={url}
                      width={width}
                      height={height}
                      /*language=CSS*/
                      {...css.resolve`
                        .container {
                          width: 100%;
                          height: 100%;
                        }
                      `}
                    />
                  </div>
                ))}
              </div>
              <div className="next">
                <button onClick={() => goToSlide(currentSlide + 1)} />
              </div>
              <div className="pager">
                <Pager itemCount={slides.length} currentIndex={currentSlide} />
              </div>
            </div>
          )}
        </div>
      </Swipe>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          height: 100%;
          background: ${colors.imagePlaceholder};
        }
        .carousel {
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .pager {
          position: absolute;
          z-index: 2;
          width: 100%;
          left: 0;
          bottom: 0;
          padding: 0.5em 0;
          background: rgba(0, 0, 0, 0)
            linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%) repeat
            scroll 0% 0%;
        }
        .slides {
          height: 100%;
          z-index: 1;
          display: grid;
          grid-template-rows: 100%;
          position: relative;
          transition: ease-out 0.3s;
        }
        .slide {
          position: relative;
          height: 100%;
        }
        .maximize-button {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 0.85em;
          z-index: 10;
        }
        .prev,
        .next {
          opacity: 0;
          transition: all 0.3s;
          position: absolute;
          z-index: 3;
          top: 0;
          background-image: linear-gradient(
            270deg,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0) 100%
          );
          height: 100%;
          width: 10%;
        }
        .container:hover .prev,
        .container:hover .next {
          opacity: 1;
        }
        .prev button,
        .next button {
          display: block;
          height: 100%;
          width: 100%;
          background: url(/static/img/venue-slider-arrow.svg) no-repeat center
            right 1em;
        }
        .next {
          right: 0;
        }
        .prev {
          left: 0;
          transform: rotate(180deg);
        }
      `}</style>
    </React.Fragment>
  );
}

export default ImageSlider;
