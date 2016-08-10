/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { logoutAction } from '.';
import fetchAboutMe from '../sources/fetchAboutMe.js';

export default function checkValidSession() {
  return (dispatch, getState) => fetchAboutMe(getState().authToken)
    .catch(() => dispatch(logoutAction()));
}
