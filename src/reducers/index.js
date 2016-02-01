import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import authenticated from './authenticated';
import authToken from './authToken';
import user from './user';
import privateLearningPaths from './privateLearningPaths';
import privateLearningPathsSortBy from './privateLearningPathsSortBy';

const rootReducers = combineReducers({
  authenticated,
  authToken,
  lang: (state = 'nb', action) => state,
  user,
  privateLearningPaths,
  privateLearningPathsSortBy,
  routing: routeReducer
});

export default rootReducers;
