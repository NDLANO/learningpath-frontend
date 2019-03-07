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
import {
  locationOrigin,
  ndlaPersonalClientId,
  auth0Domain,
} from '../sources/apiConstants';
import { getTokenExpireAt } from '../util/jwtHelper';
import { saveAccessToken, removeAccessToken } from '../sources/localStorage';

export const setAuthenticated = createAction('SET_AUTHENTICATED');

const auth = new auth0.WebAuth({
  clientID: ndlaPersonalClientId || '',
  domain: auth0Domain || '',
  responseType: 'token',
  redirectUri: `${locationOrigin}/login/success`,
  audience: 'ndla_system',
});

export function parseHash(hash) {
  return dispatch => {
    auth.parseHash({ hash, _idTokenVerification: false }, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        saveAccessToken({
          token: authResult.accessToken,
          expires: getTokenExpireAt(authResult.accessToken),
          authenticated: true,
        });

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
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(setAuthenticated(false));
      removeAccessToken();
      auth.logout({
        returnTo: `${locationOrigin}/`,
        client_id: ndlaPersonalClientId,
        federated,
      });

      resolve();
    });
  };
}

export function renewPersonalAuth() {
  return dispatch =>
    new Promise((resolve, reject) => {
      auth.renewAuth(
        {
          redirectUri: `${locationOrigin}/login/silent-callback`,
          usePostMessage: true,
        },
        (err, authResult) => {
          if (authResult && authResult.accessToken) {
            const storedTokenInfo = {
              token: authResult.accessToken,
              expiresAt: getTokenExpireAt(authResult.accessToken),
            };
            saveAccessToken({
              token: authResult.accessToken,
              expires: getTokenExpireAt(authResult.accessToken),
              authenticated: true,
            });

            dispatch(setAuthenticated(true));
            resolve(storedTokenInfo);
          } else {
            dispatch(logoutPersonalAuth());
          }
        },
      );
    });
}

export function renewAuth() {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      dispatch(renewPersonalAuth()).then(token => resolve(token));
    });
  };
}
