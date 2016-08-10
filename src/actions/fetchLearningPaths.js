/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { setLearningPathsTotalCount, setLearningPaths } from '.';
import { applicationError } from '../messages/messagesActions';
import { fetchPaths } from '../sources/learningpaths';

export default function fetchLearningPaths(query) {
  return (dispatch, getState) => fetchPaths(getState().authToken, query)
    .then(res => {
      dispatch(setLearningPathsTotalCount(res.totalCount));
      dispatch(setLearningPaths(res.results));
    })
    .catch(err => dispatch(applicationError(err)));
}
