/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isTokenValid } from '../sources/tokens';
import { decodeToken } from '../util/jwtHelper';
import { refreshToken } from '../session/sessionActions';

const fetchAuth = (input, init) => {
  const getState = () => window.tokenStatusHandler.getStoreState();
  const dispatch = window.tokenStatusHandler.getDispatch();
  const token = getState().authenticated ? getState().idToken : getState().accessToken;
  isTokenValid(decodeToken(token).exp).then((valid) => {
    if (valid.isTokenExpired) {
      dispatch(refreshToken()).then(() => fetch(input, init));
    }
  });
  return fetch(input, init);
};

export default fetchAuth;
