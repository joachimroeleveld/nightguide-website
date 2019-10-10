import PropTypes from 'prop-types';
import { memo, useState, useEffect } from 'react';
import Modal from 'react-modal';
import css from 'styled-jsx/css';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import { useElemDimensions } from '../lib/hooks';

MapModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number,
};

function MapModal(props) {
  const {
    latitude,
    longitude,
    isOpen,
    onClose,
    zoom = 3,
    ...modalProps
  } = props;

  const [mapRef, setMapRef] = useState(null);
  const mapDimensions = useElemDimensions(mapRef);
  const [viewport, setViewPort] = useState({
    width: mapDimensions.width,
    height: mapDimensions.height,
    latitude,
    longitude,
    zoom,
  });

  useEffect(() => {
    setViewPort({
      ...viewport,
      width: mapDimensions.width,
      height: mapDimensions.height,
    });
  }, [mapDimensions]);

  const reset = () => {
    setViewPort({
      width: mapDimensions.width,
      height: mapDimensions.height,
      latitude,
      longitude,
      zoom,
    });
  };

  const close = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      overlayClassName={modalStyles.className}
      className={modalStyles.className}
      {...modalProps}
    >
      <div className="content">
        <header>
          <button className="close" onClick={close} />
        </header>
        <div className="map" ref={setMapRef}>
          <ReactMapGL
            {...viewport}
            onViewportChange={setViewPort}
            mapStyle="mapbox://styles/joachimroeleveld/cjz5j6f880yv21clec19vj60f"
          >
            <Marker latitude={latitude} longitude={longitude}>
              <div className="marker" />
            </Marker>
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              style={{
                position: 'absolute',
                bottom: '2em',
                right: '1.5em',
                boxShadow: '0px 0px 3px #000000',
              }}
            />
          </ReactMapGL>
        </div>
      </div>
      {modalStyles.styles}
      {/*language=CSS*/}
      <style jsx>{`
        .content {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          position: relative;
        }
        .map {
          width: 100%;
          height: 100%;
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          z-index: 0;
        }
        .close {
          position: absolute;
          z-index: 1;
          right: 1.5em;
          top: 1.5em;
          margin-bottom: 0.5em;
          background: #fff url(/static/img/map-close.svg) no-repeat center
            center;
          border-radius: 3px;
          width: 2em;
          height: 2em;
          padding: 0.5em;
          box-shadow: 0px 0px 3px #000000;
        }
        .marker {
          width: 30px;
          height: 30px;
          background: url(/static/img/map-marker.svg) no-repeat center center;
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
      background: rgba(0, 0, 0, 0.75);
  }
  .ReactModal__Content {
      outline: none;
      WebkitOverflowScrolling: touch;
      width: 100%;
      height: 100%;
  }
`;

export default memo(MapModal);
