/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import storage from 'local-storage-fallback';

export const getPersonalToken = () =>
  storage.getItem('learningpath_personal_token');
export const getPersonalTokenExpires = () =>
  storage.getItem('learningpath_personal_token_expires_at');

export const savePersonalToken = ({ token, expires, authenticated }) => {
  storage.setItem('learningpath_personal_token', token);
  storage.setItem('learningpath_personal_token_expires_at', expires);
};

export function removePersonalToken() {
  storage.removeItem('learningpath_personal_token');
  storage.removeItem('learningpath_personal_token_expires_at');
}

export const isUserAuthenticated = () =>
  storage.getItem('learningpath_personal_token') !== null;
