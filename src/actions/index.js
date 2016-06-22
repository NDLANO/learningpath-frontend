import { createAction } from 'redux-actions';

import initializeSession from './initializeSession';
import logout from './logout';
import fetchLearningPaths from './fetchLearningPaths';
import fetchMyLearningPaths from './fetchMyLearningPaths';
import checkValidSession from './checkValidSession.js';
import timeoutMessage from './timeoutMessage.js';
import fetchOembed from './fetchOembed';
import validateOembed from './validateOembed';
import updateLearningPathStatus from './updateLearningPathStatus';

export const applicationError = createAction('APPLICATION_ERROR');
export const setAuthenticated = createAction('SET_AUTHENTICATED');
export const setAuthToken = createAction('SET_AUTH_TOKEN');
export const setLearningPaths = createAction('SET_LEARNING_PATHS');
export const changeLearningPathQuery = createAction('CHANGE_LEARNING_PATH_QUERY');
export const setLearningPathsTotalCount = createAction('SET_LEARNING_PATHS_TOTAL_COUNT');
export const setMyLearningPathsSortOrder = createAction('SET_MY_LEARNING_PATHS_SORT_ORDER');
export const setUserData = createAction('SET_USER_DATA');
export const addMessage = createAction('ADD_MESSAGE');
export const clearAllMessages = createAction('CLEAR_ALL_MESSAGES');
export const clearMessage = createAction('CLEAR_MESSAGE');
export const logoutAction = createAction('LOGOUT');
export const setOembedObject = createAction('SET_OEMBED_OBJECT');
export const setLearningPathStatus = createAction('UPDATE_LEARNING_PATH_STATUS');
export const closeSidebars = createAction('CLOSE_SIDEBARS');
export const openLeftSidebar = createAction('OPEN_LEFT_SIDEBAR');
export const openRightSidebar = createAction('OPEN_RIGHT_SIDEBAR');

export {
  initializeSession,
  logout,
  fetchLearningPaths,
  fetchMyLearningPaths,
  timeoutMessage,
  fetchOembed,
  validateOembed,
  updateLearningPathStatus,
};

export default {
  applicationError,
  setAuthenticated,
  setAuthToken,
  setLearningPaths,
  changeLearningPathQuery,
  setLearningPathsTotalCount,
  setMyLearningPathsSortOrder,
  setUserData,
  initializeSession,
  logout,
  fetchLearningPaths,
  fetchMyLearningPaths,
  addMessage,
  clearAllMessages,
  clearMessage,
  timeoutMessage,
  checkValidSession,
  logoutAction,
  fetchOembed,
  validateOembed,
  setLearningPathStatus,
  closeSidebars,
  openLeftSidebar,
  openRightSidebar,
};
