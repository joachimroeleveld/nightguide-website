import { combineReducers } from 'redux';
import locationReducer from './location';
import permissionsReducer from './permissions';

const reducers = {
  location: locationReducer,
  permissions: permissionsReducer,
};

const rootReducer = (state, action) => {
  return combineReducers({
    ...reducers,
  })(state, action);
};

export default rootReducer;
