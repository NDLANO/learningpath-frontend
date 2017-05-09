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
import { locationOrigin, auth0ClientId, auth0Domain, getToken } from '../sources/helpers';
import { decodeToken, getTimeToUpdateInMs } from '../util/jwtHelper';
import { fetchNewToken, isTokenValid } from '../sources/tokens';
import { applicationError } from '../messages/messagesActions';

export const setAuthenticated = createAction('SET_AUTHENTICATED');
export const setAccessToken = createAction('SET_ACCESS_TOKEN');
export const setUserData = createAction('SET_USER_DATA');
export const logoutAction = createAction('LOGOUT_ID_TOKEN');
export const setIdToken = createAction('SET_ID_TOKEN');

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
        dispatch(setIdToken(authResult.idToken));
        dispatch(setAuthenticated(true));
        dispatch(setUserData(decodeToken(authResult.idToken)));
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
  return dispatch => fetchNewToken()
    .then((token) => {
      dispatch(setAccessToken(token.access_token));
      dispatch(setAuthenticated(false));
      dispatch(logoutAction());
      auth.logout({
        returnTo: `${locationOrigin}/`,
        client_id: auth0ClientId,
      });
    })
    .catch(err => dispatch(applicationError(err)));
}

export function renewAuth0Token() {
  return (dispatch, getState) => new Promise((resolve) => {
    auth.renewAuth({
      redirectUri: `${locationOrigin}/login/silent-callback`,
      usePostMessage: true,
    }, (err, authResult) => {
      if (process.env.NODE_ENV === 'development' && authResult && (authResult.source === '@devtools-page' || authResult.source === '@devtools-extension')) { // Temporarily fix for bug in auth0
        isTokenValid(decodeToken(getState().idToken).exp).then((valid) => {
          if (valid.isTokenExpired) {
            dispatch(logout());
            resolve();
          }
        });
        return;
      }
      if (authResult && authResult.idToken) {
        dispatch(setIdToken(authResult.idToken));
        dispatch(setAuthenticated(true));
        dispatch(setUserData(decodeToken(authResult.idToken)));
        resolve();
      } else {
        dispatch(logout());
        resolve();
      }
    });
  });
}

export function renewAuthToken() {
  return dispatch => fetchNewToken()
    .then((token) => {
      dispatch(setAccessToken(token.access_token));
    });
}

export function refreshToken() {
  return (dispatch, getState) => new Promise((resolve) => {
    if (getState().authenticated) {
      dispatch(renewAuth0Token()).then(() => resolve());
    } else {
      dispatch(renewAuthToken()).then(() => resolve());
    }
  });
}
