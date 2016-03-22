import { createAction } from 'redux-actions';

import initializeSession from './initializeSession';
import logout from './logout';
import fetchLearningPath from './fetchLearningPath';
import fetchLearningPathStep from './fetchLearningPathStep';
import fetchLearningPaths from './fetchLearningPaths';
import fetchPrivateLearningPath from './fetchPrivateLearningPath';
import fetchPrivateLearningPathStep from './fetchPrivateLearningPathStep';
import fetchPrivateLearningPaths from './fetchPrivateLearningPaths';
import fetchEditingLearningPath from './fetchEditingLearningPath';
import updateEditingLearningPath from './updateEditingLearningPath';
import createEditingLearningPath from './createEditingLearningPath';
import createEmptyEditingPath from './createEmptyEditingPath';

export var applicationError = createAction('APPLICATION_ERROR');
export var setAuthenticated = createAction('SET_AUTHENTICATED');
export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setLearningPath = createAction('SET_LEARNING_PATH');
export var setLearningPathStep = createAction('SET_LEARNING_PATH_STEP');
export var setLearningPaths = createAction('SET_LEARNING_PATHS');
export var changeLearningPathQuery = createAction('CHANGE_LEARNING_PATH_QUERY');
export var setLearningPathsTotalCount = createAction('SET_LEARNING_PATHS_TOTAL_COUNT');
export var sortPrivateLearningPaths = createAction('SORT_PRIVATE_LEARNING_PATHS');
export var setEditingLearningPath = createAction('SET_EDITING_LEARNING_PATH');
export var createNewEditingPathStep = createAction('CREATE_NEW_EDITING_LEARNING_PATH_STEP');
export var updateEditingPathStep = createAction('UPDATE_EDITING_LEARNING_PATH_STEP');
export var updateEditingPathTitle = createAction('UPDATE_EDITING_LEARNING_PATH_TITLE');
export var updateEditingPathDescription = createAction('UPDATE_EDITING_LEARNING_PATH_DESCRIPTION');
export var setUserData = createAction('SET_USER_DATA');

export {
  initializeSession,
  logout,
  fetchLearningPath,
  fetchLearningPathStep,
  fetchLearningPaths,
  fetchPrivateLearningPath,
  fetchPrivateLearningPathStep,
  fetchPrivateLearningPaths,
  fetchEditingLearningPath,
  updateEditingLearningPath,
  createEditingLearningPath,
  createEmptyEditingPath
};

export default {
  applicationError,
  setAuthenticated,
  setAuthToken,
  setLearningPath,
  setLearningPathStep,
  setLearningPaths,
  changeLearningPathQuery,
  setLearningPathsTotalCount, 
  sortPrivateLearningPaths,
  setEditingLearningPath,
  createNewEditingPathStep,
  updateEditingPathStep,
  updateEditingPathTitle,
  updateEditingPathDescription,
  setUserData,
  initializeSession,
  logout,
  fetchLearningPath,
  fetchLearningPathStep,
  fetchLearningPaths,
  fetchPrivateLearningPath,
  fetchPrivateLearningPathStep,
  fetchPrivateLearningPaths,
  fetchEditingLearningPath,
  updateEditingLearningPath,
  createEditingLearningPath,
  createEmptyEditingPath
};
