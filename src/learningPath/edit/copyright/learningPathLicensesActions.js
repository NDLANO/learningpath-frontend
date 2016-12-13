/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { fetchPathLicenses } from '../../../sources/learningpaths';
import { applicationError } from '../../../messages/messagesActions';

export const setCreativeCommonLicenses = createAction('SET_CREATIVE_COMMON_LICENSES');
export const setAllLicenses = createAction('SET_ALL_LICENSES');

export function fetchLearningPathLicenses(creativeCommon = false) {
  return (dispatch, getState) => fetchPathLicenses(getState().authToken, creativeCommon)
    .then((licenses) => {
      if (creativeCommon) {
        dispatch(setCreativeCommonLicenses(licenses));
      } else {
        dispatch(setAllLicenses(licenses));
      }
    })
    .catch(err => dispatch(applicationError(err)));
}

export function fetchLearningPathLicensesIfNeeded(creativeCommon = false) {
  return (dispatch, getState) => {
    const { learningPathLicenses } = getState();
    if ((creativeCommon && !learningPathLicenses.creativeCommonLicenses.hasFetched) || (!creativeCommon && !learningPathLicenses.allLicenses.hasFetched)) {
      dispatch(fetchLearningPathLicenses(creativeCommon));
    }
  };
}
