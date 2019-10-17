import { combineReducers } from 'redux';
import locationReducer from './location';
import permissionsReducer from './permissions';
import citiesReducer from './cities';
import shopReducer from './shop';

const reducers = {
  location: locationReducer,
  permissions: permissionsReducer,
  cities: citiesReducer,
  shop: shopReducer,
};

const rootReducer = (state, action) => {
  return combineReducers({
    ...reducers,
  })(state, action);
};

export default rootReducer;
