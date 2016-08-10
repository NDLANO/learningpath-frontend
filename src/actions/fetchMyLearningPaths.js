/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { setLearningPaths } from '.';
import { applicationError } from '../messages/messagesActions';
import { fetchMyPaths } from '../sources/learningpaths';

export default function fetchMyLearningPaths() {
  return (dispatch, getState) => fetchMyPaths(getState().authToken)
    .then(paths => dispatch(setLearningPaths(paths)))
    .catch(err => dispatch(applicationError(err)));
}
