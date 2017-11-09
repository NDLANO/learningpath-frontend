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
import { locationOrigin, ndlaPersonalClientId, auth0Domain } from '../sources/helpers';
import { getIdTokenExpireEpoch, getAccessTokenExpireEpoch } from '../util/jwtHelper';
import { fetchNewToken } from '../sources/tokens';
import { applicationError } from '../messages/messagesActions';

export const setAuthenticated = createAction('SET_AUTHENTICATED');
export const setAccessToken = createAction('SET_ACCESS_TOKEN');
export const logoutAction = createAction('LOGOUT_ID_TOKEN');
export const setIdToken = createAction('SET_ID_TOKEN');

const auth = new auth0.WebAuth({
  clientID: ndlaPersonalClientId || '',
  domain: auth0Domain || '',
  responseType: 'token',
  redirectUri: `${locationOrigin}/login/success`,
  audience: 'ndla_system',
});


export function parseHash(hash) {
  return (dispatch) => {
    auth.parseHash({ hash, _idTokenVerification: false }, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        const token = { token: authResult.accessToken, expiresAt: getIdTokenExpireEpoch(authResult.accessToken) };
        dispatch(setIdToken(token));
        dispatch(setAuthenticated(true));
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

export function logout(federated = undefined) {
  return dispatch => fetchNewToken()
    .then((token) => {
      const newToken = { token: token.access_token, expiresAt: getAccessTokenExpireEpoch(token.access_token) };
      dispatch(setAccessToken(newToken));
      dispatch(setAuthenticated(false));
      dispatch(logoutAction());
      auth.logout({
        returnTo: `${locationOrigin}/`,
        client_id: ndlaPersonalClientId,
        federated,
      });
      window.localStorage.clear();
      return newToken;
    })
    .catch(err => dispatch(applicationError(err)));
}

export function renewAuth0Token() {
  return dispatch => new Promise((resolve) => {
    auth.renewAuth({
      redirectUri: `${locationOrigin}/login/silent-callback`,
      usePostMessage: true,
    }, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        const token = { token: authResult.accessToken, expiresAt: getIdTokenExpireEpoch(authResult.accessToken) };
        dispatch(setIdToken(token));
        dispatch(setAuthenticated(true));
        resolve(token);
      } else {
        dispatch(logout()).then(token => resolve(token));
      }
    });
  });
}

export function renewAuthToken() {
  return dispatch => fetchNewToken()
    .then((token) => {
      dispatch(setAccessToken({ token: token.access_token, expiresAt: getAccessTokenExpireEpoch(token.access_token) }));
      return { token: token.access_token, expiresAt: getAccessTokenExpireEpoch(token.access_token) };
    });
}

export function refreshToken() {
  return (dispatch, getState) => new Promise((resolve) => {
    if (getState().authenticated) {
      dispatch(renewAuth0Token()).then(token => resolve(token));
    } else {
      dispatch(renewAuthToken()).then(token => resolve(token));
    }
  });
}
