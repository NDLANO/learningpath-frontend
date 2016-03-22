import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import authenticated from './authenticated';
import authToken from './authToken';
import user from './user';
import learningPath from './learningPath';
import learningPathStep from './learningPathStep';
import learningPaths from './learningPaths';
import learningPathQuery from './learningPathQuery';
import learningPathsTotalCount from './learningPathsTotalCount';
import privateLearningPathsSortBy from './privateLearningPathsSortBy';

const rootReducers = combineReducers({
  authenticated,
  authToken,
  user,
  learningPath,
  learningPathStep,
  learningPaths,
  learningPathQuery,
  learningPathsTotalCount,
  privateLearningPathsSortBy,
  routing: routeReducer
});

export default rootReducers;
