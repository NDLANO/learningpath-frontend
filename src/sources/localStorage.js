/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import storage from 'local-storage-fallback';
import decode from 'jwt-decode';

export const getAccessToken = () =>
  storage.getItem('learningpath_access_token');
export const getAccessTokenExpires = () =>
  storage.getItem('learningpath_access_token_expires_at');
export const getIsAuthenticated = () => storage.getItem('isAuthenticated');

export const saveAccessToken = ({ token, expires, authenticated }) => {
  storage.setItem('learningpath_access_token', token);
  storage.setItem('learningpath_access_token_expires_at', expires);
  storage.setItem('isAuthenticated', authenticated);
};

export function removeAccessToken() {
  storage.removeItem('learningpath_access_token');
  storage.removeItem('learningpath_access_token_expires_at');
  storage.removeItem('isAuthenticated');
}

const isValid = accessToken => {
  try {
    decode(accessToken);
    return true;
  } catch (e) {
    return false;
  }
};

export const getSessionFromLocalStorage = () => {
  const token = getAccessToken();
  if (!isValid(token)) {
    return {};
  }
  return {
    token,
    expires: getAccessTokenExpires(),
    authenticated: getIsAuthenticated(),
  };
};
