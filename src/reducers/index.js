import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import authenticated from './authenticated';
import authToken from './authToken';
import user from './user';
import learningPath from '../learningPath/learningPathReducer';
import learningPathStep from '../learningPath/step/learningPathStepReducer';
import learningPaths from './learningPaths';
import learningPathQuery from './learningPathQuery';
import learningPathsTotalCount from './learningPathsTotalCount';
import myLearningPathsSortOrder from './myLearningPathsSortOrder';
import learningPathTags from '../learningPath/edit/tags/learningPathTagsReducer';
import oembedPreview from './oembedPreview';
import messages from '../messages/messagesReducer';
import sidebar from './sidebar';
import images from '../image/imageReducers';
import imageSearchQuery from '../image/search/imageSearchReducers';
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
  sidebar,
  oembedPreview,
  learningPathTags,
  imageSearchQuery,
  images,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducers;
