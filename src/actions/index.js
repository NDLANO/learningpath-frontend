/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';

import initializeSession from './initializeSession';
import logout from './logout';
import checkValidSession from './checkValidSession.js';
import validateOembed from './validateOembed';
import updateLearningPathStatus from './updateLearningPathStatus';

export const setAuthenticated = createAction('SET_AUTHENTICATED');
export const setAuthToken = createAction('SET_AUTH_TOKEN');
export const setMyLearningPathsSortOrder = createAction('SET_MY_LEARNING_PATHS_SORT_ORDER');
export const setUserData = createAction('SET_USER_DATA');
export const logoutAction = createAction('LOGOUT');
export const setLearningPathStatus = createAction('UPDATE_LEARNING_PATH_STATUS');
export const closeSidebars = createAction('CLOSE_SIDEBARS');
export const openLeftSidebar = createAction('OPEN_LEFT_SIDEBAR');
export const openRightSidebar = createAction('OPEN_RIGHT_SIDEBAR');
export {
  initializeSession,
  logout,
  validateOembed,
  updateLearningPathStatus,
};

export default {
  setAuthenticated,
  setAuthToken,
  setMyLearningPathsSortOrder,
  setUserData,
  initializeSession,
  logout,
  checkValidSession,
  logoutAction,
  validateOembed,
  setLearningPathStatus,
  closeSidebars,
  openLeftSidebar,
  openRightSidebar,
};
