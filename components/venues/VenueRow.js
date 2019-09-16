import React, { useRef, useState } from 'react';

import __ from '../../lib/i18n';
import { Link } from '../../routes';
import dimensions from '../../styles/dimensions';
import colors from '../../styles/colors';
import PropTypes from 'prop-types';
import RowControls from '../RowControls';
import { useElemDimensions, useWindowWidth } from '../../lib/hooks';
import VenueTile from './VenueTile';

VenueRow.propTypes = {
  routeParams: PropTypes.object.isRequired,
  venues: PropTypes.array.isRequired,
};

function VenueRow(props) {
  const { seeAllParams, routeParams, venues } = props;

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
              <VenueTile venue={venue} routeParams={routeParams} />
            </div>
          ))}
        </div>
        <div className="more">
          <div className="inner">
            <div className="content">
              {__('VenueRow.moreLocations')}
              <Link route="events" params={{ ...routeParams, ...seeAllParams }}>
                <a className="button">{__('VenueRow.discoverMore')}</a>
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
          margin-right: -${dimensions.bodyPadding};
        }
        .container > .inner {
          overflow-x: auto;
          overflow-y: hidden;
          display: flex;
          scroll-behavior: smooth;
        }
        .more {
          flex-basis: 15em;
          flex-shrink: 0;
        }
        .venues {
          display: grid;
          grid-gap: ${dimensions.gridGap.S};
          grid-template-columns: repeat(${venues.length}, 9.2em);
        }
        .more .inner {
          height: 100%;
          font-size: 13px;
          background: ${colors.tileBg};
          border-radius: ${dimensions.tileRadius};
          box-shadow: ${colors.tileShadow};
          padding: 1em;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 ${dimensions.gridGap.S};
        }
        .more .content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .more .button {
          background-color: ${colors.primaryButton};
          display: block;
          color: ${colors.textDark};
          text-align: center;
          border-radius: 3px;
          border: none;
          box-sizing: border-box;
          padding: 0.25em 0.5em;
          margin: 1em 0 0.3em;
        }
        @media (max-width: 800px) {
          .controls {
            display: none;
          }
        }
        @media (min-width: 800px) {
          .venues {
            grid-template-columns: repeat(${venues.length}, 10.81em);
            grid-gap: ${dimensions.gridGap.L};
          }
          .more .inner {
            margin: 0 ${dimensions.gridGap.L};
          }
        }
      `}</style>
    </div>
  );
}

export default VenueRow;
