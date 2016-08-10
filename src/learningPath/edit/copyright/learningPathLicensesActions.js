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

export const setLearningPathLicensens = createAction('SET_LEARNING_PATH_LICENSES');

export function fetchLearningPathLicenses() {
  return (dispatch, getState) => fetchPathLicenses(getState().authToken)
    .then(licenses => dispatch(setLearningPathLicensens(licenses)))
    .catch(err => dispatch(applicationError(err)));
}

export function fetchLearningPathLicensesIfNeeded() {
  return (dispatch, getState) => {
    const { learningPathLicenses } = getState();

    if (!learningPathLicenses.hasFetched) {
      dispatch(fetchLearningPathLicenses());
    }
  };
}
