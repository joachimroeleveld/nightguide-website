import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { createSelector } from 'reselect';

export const SET_PERMISSION = 'SET_PERMISSION';

export const { setPermission } = createActions(SET_PERMISSION);

const permissionSelector = (state, permission) => state.permissions[permission];

export const getHasPermission = createSelector(
  permissionSelector,
  permission => permission === true
);

const INITIAL_STATE = {
  location: null,
};

const reducer = handleActions(
  {
    [setPermission]: (state, action) =>
      update(state, {
        [action.payload.type]: {
          $set: action.payload.value,
        },
      }),
  },
  INITIAL_STATE
);

export default reducer;
