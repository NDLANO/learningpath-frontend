/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from "redux-actions";
import { applicationError } from "../../messages/messagesActions";
import { fetchPaths, fetchPath } from "../../sources/learningpaths";

export const setLearningPathBasedOn = createAction("SET_LEARNING_PATH_BASED_ON");
export const setLearningPathSearchResults = createAction("SET_LEARNING_PATH_SEARCH_RESULTS");

function fetchIsBasedOnPath(path) {
  return (dispatch, getState) =>
    fetchPath({ pathId: path.isBasedOn }, getState().locale)
      .then((isBasedOnPath) => {
        dispatch(setLearningPathBasedOn({ isBasedOnPath, pathId: path.id }));
      })
      .catch(() => {});
}

export function searchLearningPaths(query) {
  return (dispatch, getState) =>
    fetchPaths(query, getState().locale)
      .then((res) => {
        dispatch(
          setLearningPathSearchResults({
            results: res.results,
            totalCount: res.totalCount,
          }),
        );
        res.results.filter((path) => path.isBasedOn).map((path) => dispatch(fetchIsBasedOnPath(path)));
      })
      .catch((err) => dispatch(applicationError(err)));
}
