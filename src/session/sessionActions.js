/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';

import { applicationError } from '../messages/messagesActions';
import sendLogout from '../sources/sendLogout';
import fetchAboutMe from '../sources/fetchAboutMe';

export const setAuthenticated = createAction('SET_AUTHENTICATED');
export const setAuthToken = createAction('SET_AUTH_TOKEN');
export const setUserData = createAction('SET_USER_DATA');
export const logoutAction = createAction('LOGOUT');


export function logout() {
  return (dispatch, getState) => sendLogout(getState().authToken)
    .then(() => dispatch(logoutAction()))
    .catch(err => dispatch(applicationError(err)));
}


export function checkValidSession() {
  return (dispatch, getState) => fetchAboutMe(getState().authToken)
    .catch(() => dispatch(logoutAction()));
}


export function initializeSession(authToken) {
  return dispatch => fetchAboutMe(authToken).then(user => [
    setAuthenticated(true),
    setAuthToken(authToken),
    setUserData(user),
  ].map(dispatch))
  .catch(err => dispatch(applicationError(err)));
}
