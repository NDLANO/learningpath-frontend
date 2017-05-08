/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isTokenValid } from '../sources/tokens';
import { decodeToken } from '../util/jwtHelper';

export const fetchAuth = (input, init) => {
  if (process.env.NODE_ENV !== 'unittest') {
    const actions = require('../session/sessionActions'); //eslint-disable-line
    const getState = () => window.tokenStatusHandler.getStoreState();
    const dispatch = window.tokenStatusHandler.getDispatch();
    const token = getState().authenticated ? getState().idToken : getState().accessToken;
    isTokenValid(decodeToken(token).exp).then((valid) => {
      if (valid.isTokenExpired) {
        dispatch(actions.refreshToken()).then(() => fetch(input, init));
      }
    });
    return fetch(input, init);
  }
  return fetch(input, init);
};
