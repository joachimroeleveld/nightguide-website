import React, { useRef, useState } from 'react';

import dimensions from '../../styles/dimensions';
import PropTypes from 'prop-types';
import RowControls from '../RowControls';
import { useElemDimensions, useWindowWidth } from '../../lib/hooks';
import VenueTile from './VenueTile';

VenueRow.propTypes = {
  routeParams: PropTypes.object.isRequired,
  venues: PropTypes.array.isRequired,
};

function VenueRow(props) {
  const { routeParams, venues } = props;

  const innerRef = useRef(null);
  const venuesRef = useRef(null);
  const [venueRef, setVenueRef] = useState(null);
  const venueDimensions = useElemDimensions(venueRef);
  const windowWidth = useWindowWidth();

  const gridGap = windowWidth <= 800 ? 10 : 14;

  const scrollLeft = () => {
    innerRef.current.scrollLeft =
      innerRef.current.scrollLeft - venueDimensions.width - gridGap;
  };

  const scrollRight = () => {
    innerRef.current.scrollLeft =
      innerRef.current.scrollLeft + venueDimensions.width + gridGap;
  };

  return (
    <div className="container">
      <div className="inner" ref={innerRef}>
        <div className="venues" ref={venuesRef}>
          {venues.map((venue, index) => (
            <div key={venue.id} ref={index === 0 ? setVenueRef : undefined}>
              <VenueTile
                imgWidths={[160, 300, 600]}
                imgSizes="(max-width: 800px) 9.2em, 10.81em"
                venue={venue}
                routeParams={routeParams}
              />
            </div>
          ))}
        </div>
        <div className="spacer">
          <div />
        </div>
      </div>
      <div className="controls">
        <RowControls onBackPress={scrollLeft} onNextPress={scrollRight} />
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          position: relative;
          margin-right: -${dimensions.bodyPadding};
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
        .venues {
          display: grid;
          grid-gap: ${dimensions.gridGap.S};
          grid-template-columns: repeat(${venues.length}, 9.2em);
        }
        @media (max-width: 800px) {
          .controls {
            display: none;
          }
          .spacer {
            flex-basis: ${dimensions.gridGap.S};
            flex-shrink: 0;
          }
        }
        @media (min-width: 800px) {
          .venues {
            grid-template-columns: repeat(${venues.length}, 10.81em);
            grid-gap: ${dimensions.gridGap.L};
          }
        }
      `}</style>
    </div>
  );
}

export default VenueRow;
