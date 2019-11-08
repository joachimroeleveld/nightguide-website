import React, { useState, useRef } from 'react';

import __ from '../../lib/i18n';
import { Link } from '../../routes';
import dimensions from '../../styles/dimensions';
import colors from '../../styles/colors';
import PropTypes from 'prop-types';
import EventTile from './EventTile';
import RowControls from '../RowControls';
import { useElemDimensions, useWindowWidth } from '../../lib/hooks';

EventRow.propTypes = {
  routeParams: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  seeAllParams: PropTypes.object,
  totalCount: PropTypes.number,
};

function EventRow(props) {
  const { totalCount, events, seeAllParams, routeParams } = props;

  const innerRef = useRef(null);
  const eventsRef = useRef(null);
  const [eventRef, setEventRef] = useState(null);
  const eventDimensions = useElemDimensions(eventRef);
  const windowWidth = useWindowWidth();

  const gridGap = windowWidth <= 800 ? 10 : 14;

  const scrollLeft = () => {
    innerRef.current.scrollLeft =
      innerRef.current.scrollLeft - eventDimensions.width - gridGap;
  };

  const scrollRight = () => {
    innerRef.current.scrollLeft =
      innerRef.current.scrollLeft + eventDimensions.width + gridGap;
  };

  return (
    <div className="container">
      <div className="inner" ref={innerRef}>
        <div className="events" ref={eventsRef}>
          {events.map((event, index) => (
            <div
              key={event.id + event.dateIndex}
              className="event"
              ref={index === 0 ? setEventRef : undefined}
            >
              <EventTile
                imgWidths={[215, 320, 600]}
                imgSizes={'20em'}
                event={event}
                routeParams={routeParams}
              />
            </div>
          ))}
        </div>
        <div className="more">
          <div className="inner">
            <div className="top">
              <div className="count">
                <span className="number">{totalCount + '+'}</span>
                {__('EventRow.moreEvents')}
              </div>
            </div>
            <div className="content">
              <Link route="events" params={{ ...routeParams, ...seeAllParams }}>
                <a className="button">
                  {__('EventRow.seeMore', { n: totalCount })}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="controls">
        <RowControls onBackPress={scrollLeft} onNextPress={scrollRight} />
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          position: relative;
        }
        .container > .inner {
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          display: flex;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .container > .inner::-webkit-scrollbar {
          display: none;
        }
        .more {
          flex-basis: 15em;
          flex-shrink: 0;
        }
        .more .inner {
          height: 100%;
          background: ${colors.tileBg};
          border-radius: ${dimensions.tileRadius};
          box-shadow: ${colors.tileShadow};
          box-sizing: border-box;
          margin: 0 ${dimensions.gridGap.S};
          position: relative;
          overflow: hidden;
          font-size: 0.928em;
          display: flex;
          flex-direction: column;
        }
        .more .top {
          width: 100%;
          height: 8em;
          background: ${colors.imagePlaceholder};
          color: #8d8d8d;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .more .count {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .more .number {
          font-size: 2em;
          line-height: 1em;
          font-weight: 400;
        }
        .more .content {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
        }
        .more .button {
          display: block;
          color: #000;
          background: ${colors.primaryButton};
          text-align: center;
          border-radius: 3px;
          box-sizing: border-box;
          padding: 0.25em 0.5em;
          margin: 0.5em 0 0.3em;
        }
        .events {
          display: grid;
          grid-template-columns: repeat(${events.length}, 20em);
          grid-gap: ${dimensions.gridGap.S};
        }
        @media (max-width: 800px) {
          .container {
            margin-right: -${dimensions.bodyPadding};
          }
          .controls {
            display: none;
          }
        }
        @media (min-width: 800px) {
          .more .inner {
            margin: 0 ${dimensions.gridGap.L};
            font-size: 0.875em;
          }
          .events {
            grid-template-columns: repeat(
              ${events.length},
              calc((${dimensions.pageWidth} - 3 * ${dimensions.gridGap.L}) / 4)
            );
            grid-gap: ${dimensions.gridGap.L};
          }
        }
      `}</style>
    </div>
  );
}

export default EventRow;
