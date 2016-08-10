/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { setUserData, setAuthToken, setAuthenticated } from '.';
import { applicationError } from '../messages/messagesActions';
import fetchAboutMe from '../sources/fetchAboutMe';

export default function initializeSession(authToken) {
  return dispatch => fetchAboutMe(authToken).then(user => [
    setAuthenticated(true),
    setAuthToken(authToken),
    setUserData(user),
  ].map(dispatch))
  .catch(err => dispatch(applicationError(err)));
}
