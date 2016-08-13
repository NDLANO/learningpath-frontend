/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { applicationError } from '../../messages/messagesActions';
import { fetchPaths } from '../../sources/learningpaths';

export const setLearningPathSearchResults = createAction('SET_LEARNING_PATH_SEARCH_RESULTS');
export const setLearningPathsTotalCount = createAction('SET_LEARNING_PATHS_TOTAL_COUNT');

export function searchLearningPaths(query) {
  return (dispatch, getState) => fetchPaths(getState().authToken, query)
    .then(res => {
      dispatch(setLearningPathsTotalCount(res.totalCount));
      dispatch(setLearningPathSearchResults(res.results));
    })
    .catch(err => dispatch(applicationError(err)));
}
