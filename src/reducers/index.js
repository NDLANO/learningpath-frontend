import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import authenticated from './authenticated';
import authToken from './authToken';
import user from './user';

const rootReducers = combineReducers({
  authenticated,
  authToken,
  user,
  routing: routeReducer
});

export default rootReducers;
