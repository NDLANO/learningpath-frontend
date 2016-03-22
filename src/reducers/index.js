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
import privateLearningPath from './privateLearningPath';
import privateLearningPaths from './privateLearningPaths';
import privateLearningPathsSortBy from './privateLearningPathsSortBy';
import privateLearningPathStep from './privateLearningPathStep';
import editingLearningPath from './editingLearningPath';
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
  privateLearningPath,
  privateLearningPaths,
  privateLearningPathsSortBy,
  privateLearningPathStep,
  editingLearningPath,
  routing: routeReducer,
  messages
});

export default rootReducers;
