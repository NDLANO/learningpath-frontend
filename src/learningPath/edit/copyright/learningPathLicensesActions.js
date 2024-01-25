/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from "redux-actions";
import { fetchPathLicenses } from "../../../sources/learningpaths";
import { applicationError } from "../../../messages/messagesActions";

export const setCreativeCommonLicenses = createAction("SET_CREATIVE_COMMON_LICENSES");
export const setAllLicenses = createAction("SET_ALL_LICENSES");

export function fetchLearningPathLicenses(filter = "") {
  return (dispatch) =>
    fetchPathLicenses(filter)
      .then((licenses) => {
        if (filter.length > 0) {
          dispatch(setCreativeCommonLicenses(licenses));
        } else {
          dispatch(setAllLicenses(licenses));
        }
      })
      .catch((err) => dispatch(applicationError(err)));
}

export function fetchLearningPathLicensesIfNeeded(filter = "") {
  return (dispatch, getState) => {
    const { learningPathLicenses } = getState();
    if (
      (filter.length > 0 && !learningPathLicenses.creativeCommonLicenses.hasFetched) ||
      (filter.length === 0 && !learningPathLicenses.allLicenses.hasFetched)
    ) {
      dispatch(fetchLearningPathLicenses(filter));
    }
  };
}
