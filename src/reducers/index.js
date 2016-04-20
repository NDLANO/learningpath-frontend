import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authenticated from './authenticated';
import authToken from './authToken';
import user from './user';
import learningPath from './learningPath';
import learningPathStep from './learningPathStep';
import learningPaths from './learningPaths';
import learningPathQuery from './learningPathQuery';
import learningPathsTotalCount from './learningPathsTotalCount';
import privateLearningPathsSortBy from './privateLearningPathsSortBy';
import messages from './messages';

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
  messages,
  routing: routerReducer
});

export default rootReducers;
