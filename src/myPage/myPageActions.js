/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { applicationError, addMessage } from '../messages/messagesActions';
import { fetchMyPaths, updatePath } from '../sources/learningpaths';
import polyglot from '../i18n';

export const setMyLearningPathsSortOrder = createAction(
  'SET_MY_LEARNING_PATHS_SORT_ORDER',
);
export const setLearningPaths = createAction('SET_LEARNING_PATHS');

export function removeRejectedMessage(learningPath) {
  return dispatch =>
    updatePath(
      { pathId: learningPath.id },
      { revision: learningPath.revision, deleteMessage: true },
    )
      .then(path => {
        dispatch(
          addMessage({
            message: polyglot('myPage.rejectedMessageAlert.messageRemoved', {
              title: path.title.title,
            }),
          }),
        );
      })
      .catch(err => dispatch(applicationError(err)));
}

export function fetchMyLearningPaths() {
  return (dispatch, getState) =>
    fetchMyPaths(getState().accessToken)
      .then(paths => {
        paths.forEach(path => {
          if (path.message && path.message.length > 0) {
            dispatch(
              addMessage({
                severity: 'danger',
                message: polyglot('myPage.rejectedMessageAlert.message', {
                  message: path.message,
                  title: path.title.title,
                }),
                action: {
                  title: polyglot('myPage.rejectedMessageAlert.action'),
                  onClick: () => dispatch(removeRejectedMessage(path)),
                },
                timeToLive: 0,
              }),
            );
          }
        });
        dispatch(setLearningPaths(paths));
      })
      .catch(err => dispatch(applicationError(err)));
}
