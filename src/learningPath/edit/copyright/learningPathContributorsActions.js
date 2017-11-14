/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { fetchPathContributors } from '../../../sources/learningpaths';
import { applicationError } from '../../../messages/messagesActions';

export const setLearningPathContributors = createAction(
  'SET_LEARNING_PATH_CONTRIBUTORS',
);

export function fetchLearningPathContributors() {
  return dispatch =>
    fetchPathContributors()
      .then(contributors => dispatch(setLearningPathContributors(contributors)))
      .catch(err => dispatch(applicationError(err)));
}

export function fetchLearningPathContributorsIfNeeded() {
  return (dispatch, getState) => {
    const { learningPathContributors } = getState();

    if (!learningPathContributors.hasFetched) {
      dispatch(fetchLearningPathContributors());
    }
  };
}
