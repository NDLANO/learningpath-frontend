/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import decode from 'jwt-decode';

export function getTokenExpireAt(token) {
  const decoded = decode(token);
  return (decoded.exp - decoded.iat) * 1000 + new Date().getTime() - 60 * 1000;
}

export const decodeToken = accessToken => decode(accessToken);

export const getScope = accessToken => {
  return decodeToken(accessToken).scope || [];
};
