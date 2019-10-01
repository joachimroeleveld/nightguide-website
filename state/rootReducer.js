import { combineReducers } from 'redux';
import locationReducer from './location';
import permissionsReducer from './permissions';
import citiesReducer from './cities';

const reducers = {
  location: locationReducer,
  permissions: permissionsReducer,
  cities: citiesReducer,
};

const rootReducer = (state, action) => {
  return combineReducers({
    ...reducers,
  })(state, action);
};

export default rootReducer;
