/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as actions from '../session/sessionActions';
import TokenStatusHandler from '../util/TokenStatusHandler';
import { authorizationHeader, getToken, getTokenExpiresAt } from '../sources/helpers';

export const fetchAuth = (url, options = {}) => {
  if (process.env.NODE_ENV === 'unittest') {
    return fetch(url, { ...options, headers: { ...options.headers, Authorization: authorizationHeader('12345678') } });
  }

  const tokenStatusHandler = TokenStatusHandler.getInstance();
  const getState = tokenStatusHandler.getStoreState;
  const oldToken = getToken(getState);
  const headers = { ...options.headers, Authorization: authorizationHeader(oldToken) };

  if (__SERVER__) {
    return fetch(url, { ...options, headers });
  }

  if (new Date().getTime() >= getTokenExpiresAt(getState)) {
    const dispatch = tokenStatusHandler.getDispatch();
    return dispatch(actions.refreshToken()).then(newToken => fetch(url, { ...options, headers: { ...options.headers, Authorization: authorizationHeader(newToken.token) } }));
  }
  return fetch(url, { ...options, headers });
};
