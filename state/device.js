import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';

export const SET_DEVICE = 'SET_DEVICE';

// Not used, device is passed as initial state
export const { setDevice } = createActions(SET_DEVICE);

export default handleActions(
  {
    [SET_DEVICE]: (state, action) =>
      update(state, {
        type: { $set: action.payload.type },
      }),
  },
  {
    type: null,
  }
);
