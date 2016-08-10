/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { logoutAction } from '.';
import { applicationError } from '../messages/messagesActions';
import sendLogout from '../sources/sendLogout';

export default function logout() {
  return (dispatch, getState) => sendLogout(getState().authToken)
    .then(() => dispatch(logoutAction()))
    .catch(err => dispatch(applicationError(err)));
}
