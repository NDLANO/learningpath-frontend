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
import { getToken } from '../../sources/helpers';

export const setLearningPathBasedOn = createAction('SET_LEARNING_PATH_BASED_ON');
export const setLearningPathSearchResults = createAction('SET_LEARNING_PATH_SEARCH_RESULTS');

function fetchIsBasedOnPath(path) {
  return (dispatch, getState) => fetchPath(getToken(getState), { pathId: path.isBasedOn })
    .then((isBasedOnPath) => {
      dispatch(setLearningPathBasedOn({ isBasedOnPath, pathId: path.id }));
    });
}

export function searchLearningPaths(query) {
  return (dispatch, getState) => fetchPaths(getToken(getState), query)
    .then((res) => {
      dispatch(setLearningPathSearchResults({
        results: res.results,
        totalCount: res.totalCount,
      }));
      res.results.filter(path => path.isBasedOn).map(path => dispatch(fetchIsBasedOnPath(path)));
    })
    .catch(err => dispatch(applicationError(err)));
}
