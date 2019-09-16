import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { createSelector } from 'reselect';

export const SET_LOCATION = 'SET_LOCATION';

export const { setLocation } = createActions(SET_LOCATION);

export const getCurrentLocation = createSelector(
  state => state.location.currentLocation.longitude,
  state => state.location.currentLocation.latitude,
  (longitude, latitude) => {
    if (latitude && longitude) {
      return {
        longitude,
        latitude,
      };
    } else {
      return null;
    }
  }
);

export default handleActions(
  {
    [setLocation]: (state, action) =>
      update(state, {
        currentLocation: {
          longitude: { $set: action.payload.longitude },
          latitude: { $set: action.payload.latitude },
          accuracy: { $set: action.payload.accuracy },
          lastUpdate: { $set: new Date().getTime() },
        },
      }),
  },
  {
    currentLocation: {
      longitude: null,
      latitude: null,
      accuracy: null,
      lastUpdate: null,
    },
  }
);
