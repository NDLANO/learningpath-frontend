/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from "redux-actions";
import { fetchPathTags } from "../../../sources/learningpaths";
import { applicationError } from "../../../messages/messagesActions";

export const setLearningPathTags = createAction("SET_LEARNING_PATH_TAGS");

export function fetchLearningPathTags() {
  return (dispatch, getState) =>
    fetchPathTags({}, getState().locale)
      .then((tags) => dispatch(setLearningPathTags(tags)))
      .catch((err) => dispatch(applicationError(err)));
}

export function fetchLearningPathTagsIfNeeded() {
  return (dispatch, getState) => {
    const { learningPathTags } = getState();

    if (!learningPathTags.hasFetched) {
      dispatch(fetchLearningPathTags());
    }
  };
}
