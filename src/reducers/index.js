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
import accessToken from './accessToken';
import idToken from './idToken';
import user from './user';
import learningPath from '../learningPath/learningPathReducer';
import learningPathSearch from '../learningPath/search/learningPathSearchReducer';
import learningPathStep from '../learningPath/step/learningPathStepReducer';
import learningPaths from './learningPaths';
import myLearningPathsSortOrder from './myLearningPathsSortOrder';
import learningPathTags from '../learningPath/edit/tags/learningPathTagsReducer';
import learningPathLicenses from '../learningPath/edit/copyright/learningPathLicensesReducer';
import oembedPreview from './oembedPreview';
import messages from '../messages/messagesReducer';
import sidebar from './sidebar';
import imageSearch from '../imageSearch/imageReducers';
import locale from '../locale/localeReducer';
import embedSearch from '../embedSearch/embedSearchReducer';
import pinterest from '../pinterest/pinterestReducer';

const rootReducers = combineReducers({
  authenticated,
  accessToken,
  idToken,
  user,
  locale,
  learningPath,
  learningPathSearch,
  learningPathStep,
  learningPaths,
  myLearningPathsSortOrder,
  messages,
  sidebar,
  oembedPreview,
  learningPathTags,
  learningPathLicenses,
  imageSearch,
  embedSearch,
  pinterest,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducers;
