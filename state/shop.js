import update from 'immutability-helper';
import { createActions, handleActions } from 'redux-actions';

export const SET_CURRENCY = 'SET_CURRENCY';

export const { setCurrency } = createActions(SET_CURRENCY);

export const getCurrency = state => state.shop.currency;

export default handleActions(
  {
    [setCurrency]: (state, action) =>
      update(state, { currency: { $set: action.payload } }),
  },
  { currency: 'EUR' }
);
