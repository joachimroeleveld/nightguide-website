import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import __ from '../lib/i18n';
import { useToggleState } from '../lib/hooks';
import MapModal from './MapModal';

SeeOnMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

function SeeOnMap(props) {
  const { latitude, longitude } = props;
  const [showModal, toggleShowModal] = useToggleState(false);

  return (
    <Fragment>
      <button className="container" onClick={toggleShowModal}>
        <div className="bg" />
        <span className="text">{__('SeeOnMap.seeOnMap')}</span>
      </button>
      <MapModal
        latitude={latitude}
        longitude={longitude}
        isOpen={showModal}
        onClose={toggleShowModal}
        zoom={15}
      />
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: block;
          width: 100%;
          height: 5em;
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }
        .bg {
          background: url(/static/img/map-tile.jpg) no-repeat center center;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          position: absolute;
          transition: 0.3s transform;
        }
        .container:hover .bg {
          transform: scale(1.05);
        }
        img {
          left: 0;
          top: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .text {
          position: relative;
          padding-left: 1.5em;
          background: url(/static/img/map-enlarge.svg) left center no-repeat;
        }
      `}</style>
    </Fragment>
  );
}

export default SeeOnMap;
