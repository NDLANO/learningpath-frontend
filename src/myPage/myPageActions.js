/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { applicationError } from '../messages/messagesActions';
import { fetchMyPaths } from '../sources/learningpaths';

export const setMyLearningPathsSortOrder = createAction('SET_MY_LEARNING_PATHS_SORT_ORDER');
export const setLearningPaths = createAction('SET_LEARNING_PATHS');

export function fetchMyLearningPaths() {
  return (dispatch, getState) => fetchMyPaths(getState().accessToken)
    .then(paths => dispatch(setLearningPaths(paths)))
    .catch(err => dispatch(applicationError(err)));
}
