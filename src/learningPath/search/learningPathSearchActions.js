/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { applicationError } from '../../messages/messagesActions';
import { fetchPaths, fetchPath } from '../../sources/learningpaths';

export const setLearningPathBasedOn = createAction('SET_LEARNING_PATH_BASED_ON');
export const setLearningPathSearchResults = createAction('SET_LEARNING_PATH_SEARCH_RESULTS');

function fetchIsBasedOnPath(path, index) {
  return (dispatch, getState) => fetchPath(getState().authToken, { pathId: path.isBasedOn })
    .then((isBasedOnPath) => {
      dispatch(setLearningPathBasedOn({ isBasedOnPath, index }));
    });
}

export function searchLearningPaths(query) {
  return (dispatch, getState) => fetchPaths(getState().authToken, query)
    .then((res) => {
      dispatch(setLearningPathSearchResults({
        results: res.results,
        totalCount: res.totalCount,
      }));
      res.results.filter(path => path.isBasedOn).map((path, index) => dispatch(fetchIsBasedOnPath(path, index)));
    })
    .catch(err => dispatch(applicationError(err)));
}
