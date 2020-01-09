import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import getDistance from 'geolib/es/getDistance';

import __ from '../lib/i18n';
import { getCurrentLocation, setLocation } from '../state/location';
import { getHasPermission, setPermission } from '../state/permissions';
import colors from '../styles/colors';

DistanceIndicator.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

function DistanceIndicator(props) {
  const {
    latitude,
    longitude,
    location,
    setPermission,
    setLocation,
    hasPermission,
  } = props;

  useEffect(() => {
    navigator.permissions;
  }, []);

  function requestLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setPermission({ type: 'location', value: true });
        setLocation(pos.coords);
      },
      () => setPermission({ type: 'location', value: false }),
      {
        enableHighAccuracy: true,
      }
    );
  }

  const distance = useMemo(() => {
    if (!hasPermission || !location) return null;

    return getDistance(
      {
        latitude,
        longitude,
      },
      {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      location.accuracy
    );
  }, [latitude, longitude, location, hasPermission]);

  const distanceText = useMemo(() => {
    let val;
    if (distance < 1000) {
      // Display meters without decimals
      val = `${Math.round(distance)}m`;
    } else {
      if (distance < 10000) {
        // Show kms with 2 decimals
        val = Math.round(((distance / 1000 + 0.00001) * 100) / 100);
      } else {
        // Show kms without decimals
        val = Math.round(distance / 1000);
      }
      val += 'km';
    }
    return val;
  }, [distance]);

  return (
    <div className="container">
      {!hasPermission && (
        <button onClick={requestLocation}>
          {__('DistanceIndicator.showDistance')}
        </button>
      )}
      {hasPermission && <span>{distanceText}</span>}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          color: ${colors.textSecondary};
          padding-left: 1.3em;
          background: url(../static/img/distance-indicator.svg) no-repeat left
            center;
        }
      `}</style>
    </div>
  );
}

const mapStateToProps = state => ({
  location: getCurrentLocation(state),
  hasPermission: getHasPermission(state, 'location'),
});

const mapDispatchToProps = {
  setLocation,
  setPermission,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistanceIndicator);
