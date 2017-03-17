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
export const setAccessToken = createAction('SET_ACCESS_TOKEN');
export const setStateUuid = createAction('SET_STATE_UUID');
export const setUserData = createAction('SET_USER_DATA');
export const logoutAction = createAction('LOGOUT');


export function logout() {
  return (dispatch, getState) => sendLogout(getState().accessToken)
    .then(() => dispatch(logoutAction()))
    .catch(err => dispatch(applicationError(err)));
}


export function checkValidSession() {
  return (dispatch, getState) => fetchAboutMe(getState().accessToken)
    .catch(() => dispatch(logoutAction()));
}


export function initializeSession(accessToken) {
  return dispatch => fetchAboutMe(accessToken).then(user => [
    setAuthenticated(true),
    setAccessToken(accessToken),
    setUserData(user),
  ].map(dispatch))
  .catch(err => dispatch(applicationError(err)));
}
