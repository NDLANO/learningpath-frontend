/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isTokenValid } from '../sources/tokens';
import { decodeToken } from '../util/jwtHelper';
import * as actions from '../session/sessionActions';
import TokenStatusHandler from '../util/TokenStatusHandler';
import { authorizationHeader, getToken } from '../sources/helpers';

export const fetchAuth = (input, init) => {
  if (__SERVER__ || process.env.NODE_ENV === 'unittest') {
    return fetch(input, init);
  }

  const tokenStatusHandler = TokenStatusHandler.getInstance();
  const getState = tokenStatusHandler.getStoreState;
  const dispatch = tokenStatusHandler.getDispatch();
  const token = getState().authenticated ? getState().idToken : getState().accessToken;

  return isTokenValid(decodeToken(token).exp).then((valid) => {
    if (valid.isTokenExpired) {
      return dispatch(actions.refreshToken()).then(() => fetch(input, { ...init, headers: { ...init.headers, Authorization: authorizationHeader(getToken(getState)) } }));
    }
    return fetch(input, init);
  });
};
