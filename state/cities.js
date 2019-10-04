import { createActions, handleActions } from 'redux-actions';

export const SET_CITIES = 'SET_CITIES';

export const getPageSlugs = state => Object.keys(state.cities);

export const { setCities } = createActions(SET_CITIES);

export default handleActions(
  {
    [setCities]: (state, action) => action.payload,
  },
  { 'es/ibiza': {} }
);
