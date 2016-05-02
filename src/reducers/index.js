import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import authenticated from './authenticated';
import authToken from './authToken';
import user from './user';
import learningPath from './learningPath';
import learningPathStep from './learningPathStep';
import learningPaths from './learningPaths';
import learningPathQuery from './learningPathQuery';
import learningPathsTotalCount from './learningPathsTotalCount';
import myLearningPathsSortOrder from './myLearningPathsSortOrder';
import oembedIsValid from './oembedIsValid';
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
  myLearningPathsSortOrder,
  messages,
  oembedIsValid,
  routing: routerReducer,
  form: formReducer
});

export default rootReducers;
