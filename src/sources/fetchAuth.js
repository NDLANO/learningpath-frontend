/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as actions from '../session/sessionActions';
import TokenStatusHandler from '../util/TokenStatusHandler';
import { authorizationHeader } from '../sources/helpers';

export const fetchAuth = (url, options = {}) => {
  if (process.env.NODE_ENV === 'unittest') {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: authorizationHeader('12345678'),
      },
    });
  }

  const tokenStatusHandler = TokenStatusHandler.getInstance();
  const getState = tokenStatusHandler.getStoreState;
  const headers = {
    ...options.headers,
    Authorization: authorizationHeader(getState().accessToken.token),
  };
  if (process.env.BUILD_TARGET === 'server') {
    return fetch(url, { ...options, headers });
  }

  if (new Date().getTime() >= getState().accessToken.expiresAt) {
    const dispatch = tokenStatusHandler.getDispatch();
    return dispatch(actions.renewAuth()).then(newToken =>
      fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: authorizationHeader(newToken.token),
        },
      }),
    );
  }
  return fetch(url, { ...options, headers });
};
