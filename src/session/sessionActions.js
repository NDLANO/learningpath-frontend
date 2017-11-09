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
import { getTokenExpireAt } from '../util/jwtHelper';
import { fetchNewSystemToken } from '../sources/tokens';
import { applicationError } from '../messages/messagesActions';

export const setAuthenticated = createAction('SET_AUTHENTICATED');
export const setAccessToken = createAction('SET_ACCESS_TOKEN');

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
        const storedTokenInfo = { token: authResult.accessToken, expiresAt: getTokenExpireAt(authResult.accessToken) };
        dispatch(setAccessToken(storedTokenInfo));
        dispatch(setAuthenticated(true));
        dispatch(routerActions.replace('/minside'));
      }
    });
  };
}

export function loginPersonalAuth(type) {
  auth.authorize({
    connection: type,
  });
}

export function logoutPersonalAuth(federated = undefined) {
  return dispatch => fetchNewSystemToken()
    .then((token) => {
      const storedTokenInfo = { token: token.access_token, expiresAt: getTokenExpireAt(token.access_token) };
      dispatch(setAccessToken(storedTokenInfo));
      dispatch(setAuthenticated(false));
      auth.logout({
        returnTo: `${locationOrigin}/`,
        client_id: ndlaPersonalClientId,
        federated,
      });
      return storedTokenInfo;
    })
    .catch(err => dispatch(applicationError(err)));
}

export function renewPersonalAuth() {
  return dispatch => new Promise((resolve) => {
    auth.renewAuth({
      redirectUri: `${locationOrigin}/login/silent-callback`,
      usePostMessage: true,
    }, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        const storedTokenInfo = { token: authResult.accessToken, expiresAt: getTokenExpireAt(authResult.accessToken) };
        dispatch(setAccessToken(storedTokenInfo));
        dispatch(setAuthenticated(true));
        resolve(storedTokenInfo);
      } else {
        dispatch(logoutPersonalAuth()).then(token => resolve(token));
      }
    });
  });
}

export function renewSystemAuth() {
  return dispatch => fetchNewSystemToken()
    .then((token) => {
      const storedTokenInfo = { token: token.access_token, expiresAt: getTokenExpireAt(token.access_token) };
      dispatch(setAccessToken(storedTokenInfo));
      dispatch(setAuthenticated(false))
      return storedTokenInfo;
    });
}

export function renewAuth() {
  return (dispatch, getState) => new Promise((resolve) => {
    if (getState().authenticated) {
      dispatch(renewPersonalAuth()).then(token => resolve(token));
    } else {
      dispatch(renewSystemAuth()).then(token => resolve(token));
    }
  });
}
