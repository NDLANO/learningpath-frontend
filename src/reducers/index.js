/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import authenticated from './authenticated';
import authToken from './authToken';
import user from './user';
import learningPath from '../learningPath/learningPathReducer';
import learningPathSearch from '../learningPath/search/learningPathSearchReducer';
import learningPathStep from '../learningPath/step/learningPathStepReducer';
import learningPaths from './learningPaths';
import learningPathsTotalCount from './learningPathsTotalCount';
import myLearningPathsSortOrder from './myLearningPathsSortOrder';
import learningPathTags from '../learningPath/edit/tags/learningPathTagsReducer';
import learningPathLicenses from '../learningPath/edit/copyright/learningPathLicensesReducer';
import oembedPreview from './oembedPreview';
import messages from '../messages/messagesReducer';
import sidebar from './sidebar';
import imageSearch from '../imageSearch/imageReducers';
import locale from '../locale/localeReducer';

const rootReducers = combineReducers({
  authenticated,
  authToken,
  user,
  locale,
  learningPath,
  learningPathSearch,
  learningPathStep,
  learningPaths,
  learningPathsTotalCount,
  myLearningPathsSortOrder,
  messages,
  sidebar,
  oembedPreview,
  learningPathTags,
  learningPathLicenses,
  imageSearch,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducers;
