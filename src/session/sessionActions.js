/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import auth0 from 'auth0-js';
import { routerActions } from 'react-router-redux';
import { locationOrigin, auth0ClientId, auth0Domain } from '../sources/helpers';
import { isTokenExpired, decodeIdToken } from '../util/jwtHelper';
import fetchTokenOnLogout from '../sources/fetchTokenOnLogout';
import { applicationError } from '../messages/messagesActions';

export const setAuthenticated = createAction('SET_AUTHENTICATED');
export const setAccessToken = createAction('SET_ACCESS_TOKEN');
export const setStateUuid = createAction('SET_STATE_UUID');
export const setUserData = createAction('SET_USER_DATA');
export const logoutAction = createAction('LOGOUT');


const auth = new auth0.WebAuth({
  clientID: auth0ClientId,
  domain: auth0Domain,
  responseType: 'token id_token',
  redirectUri: `${locationOrigin}/login/success`,
  scope: 'openid app_metadata name',
});


export function parseHash(hash) {
  return (dispatch) => {
    auth.parseHash({ hash, _idTokenVerification: false }, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        dispatch(setAccessToken(authResult.idToken));
        dispatch(setAuthenticated(true));
        dispatch(setUserData(decodeIdToken(authResult.idToken)));
        dispatch(routerActions.replace('/minside'));
      }
    });
  };
}

export function loginSocialMedia(type) {
  auth.authorize({
    connection: type,
  });
}

export function logout() {
  return dispatch => fetchTokenOnLogout
    .then((token) => {
      dispatch(logoutAction(token.access_token));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function checkValidSession() {
  return (dispatch, getState) => {
    const token = getState().accessToken;

    const isValidToken = !!token && !isTokenExpired(token);
    if (!isValidToken) {
      dispatch(logout);
    }
    return isValidToken;
  };
}
