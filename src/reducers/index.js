import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import authToken from './authToken';
import user from './user';

const rootReducers = combineReducers({
  authToken,
  user,
  routing: routeReducer
});

export default rootReducers;
