import React, { useState, useEffect, useMemo, useRef } from 'react';
import css from 'styled-jsx/css';
import Swipe from 'react-easy-swipe';

import { Link } from '../../routes';
import ResponsiveImage from '../ResponsiveImage';
import { _o } from '../../lib/i18n';
import Pager from '../Pager';
import colors from '../../styles/colors';
import { removeTags } from '../../lib/util';
import { TileButton } from '../TileButton';
import ImagesModal from '../ImagesModal';
import { useElemDimensions, useToggleState } from '../../lib/hooks';

const SWIPE_TOLERANCE = 30;

const Img = ({ bigOverlay, ...imgProps }) => (
  <ResponsiveImage
    showOverlay={true}
    /*language=CSS*/
    {...css.resolve`
      .container {
        display: block;
        width: 100%;  
        height: 100%;
      }
      .overlay {
        bottom: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(rgba(0, 0, 0, 0.01) ${
          bigOverlay ? '30%' : '90%'
        }, rgba(0, 0, 0, 1));
      }
    `}
    {...imgProps}
  />
);

function VenueSlider(props) {
  const { routeParams, venue, imgWidths, imgSizes } = props;
  const { name, images, description } = venue;
  const imgProps = { widths: imgWidths, sizes: imgSizes };

  if (!images.length) {
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

  const slidesCount = 1 + (description ? 1 : 0) + images.slice(1).length;

  const goToSlide = slide => {
    if (slide === slidesCount || slide < 0) return;
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

    if (newSlide < 0 || newSlide > slidesCount - 1) {
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

  const linkParams = useMemo(() => ({ ...routeParams, venue: venue.id }), [
    routeParams,
    venue.id,
  ]);

  const trimmedDescription =
    description &&
    removeTags(_o(description))
      .slice(0, 130)
      .trim() + '...';

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
              <div className="info-button">
                <TileButton
                  onClick={toggleIsImageModalOpen}
                  iconSrc={'/static/img/tile-maximize.svg'}
                />
                <ImagesModal
                  onClose={toggleIsImageModalOpen}
                  isOpen={isImageModalOpen}
                  images={images}
                />
              </div>
              <Link route="venue" params={linkParams}>
                <a className="venue-link" target="_blank">
                  <div
                    className="slides"
                    style={{
                      gridTemplateColumns: `${
                        containerDimensions.width
                      }px `.repeat(slidesCount),
                      width: containerDimensions.width * slidesCount,
                      height: containerDimensions.height,
                      transform: `translateX(${translateX}px)`,
                    }}
                  >
                    <div className="slide-name">{name}</div>
                    {!!trimmedDescription && (
                      <div className="slide-description">
                        {trimmedDescription}
                      </div>
                    )}
                    {images.slice(1).map(image => (
                      <div key={image.url} className="slide-image">
                        <Img url={image.url} {...imgProps} />
                      </div>
                    ))}
                  </div>
                </a>
              </Link>
              <div className="next">
                <button onClick={() => goToSlide(currentSlide + 1)} />
              </div>
              <div className="pager">
                <Pager itemCount={slidesCount} currentIndex={currentSlide} />
              </div>
              <div className="bg-image">
                <Img bigOverlay={true} url={images[0].url} {...imgProps} />
              </div>
            </div>
          )}
        </div>
      </Swipe>
      {/*language=CSS*/}
      <style jsx>{`
        .venue-link {
          display: block;
          position: relative;
          z-index: 1;
          height: 100%;
        }
        .container {
          height: 100%;
        }
        .carousel {
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .bg-image {
          z-index: 0;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
        }
        .pager {
          position: absolute;
          z-index: 2;
          width: 100%;
          left: 0;
          bottom: 0.5em;
        }
        .slides {
          height: 100%;
          z-index: 1;
          display: grid;
          grid-template-rows: 100%;
          position: relative;
          transition: ease-out 0.3s;
        }
        .slide-name,
        .slide-description {
          justify-content: center;
          align-items: flex-end;
          padding: 0 3em 2em;
          height: 100%;
          display: flex;
          box-sizing: border-box;
        }
        .slide-description {
          padding-bottom: 3em;
          font-size: 0.9em;
          background: rgba(0, 0, 0, 0.6);
        }
        .slide-name {
          text-align: center;
          align-items: flex-end;
          padding-bottom: 2em;
          font-size: 1.2em;
          font-weight: 600;
        }
        .slide-image {
          background: ${colors.imagePlaceholder};
          position: relative;
          height: 100%;
        }
        .info-button {
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

export default VenueSlider;
