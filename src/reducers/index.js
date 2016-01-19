import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import authenticated from './authenticated';
import authToken from './authToken';
import user from './user';
import privateLearningPaths from './privateLearningPaths';

const rootReducers = combineReducers({
  authenticated,
  authToken,
  lang: (state = 'nb', action) => state,
  user,
  privateLearningPaths,
  routing: routeReducer
});

export default rootReducers;
