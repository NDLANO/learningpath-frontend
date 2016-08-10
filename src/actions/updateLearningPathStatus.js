/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { routerActions } from 'react-router-redux';

import polyglot from '../i18n';
import { setLearningPathStatus } from '.';
import { applicationError, addMessage } from '../messages/messagesActions';
import { updateStatus } from '../sources/learningpaths';

export default function updateLearningPathStatus(pathId, status, redirectUrl = false) {
  return (dispatch, getState) => updateStatus(getState().authToken, { pathId }, { status })
    .then(() => {
      dispatch(setLearningPathStatus({ id: pathId, status }));
      dispatch(addMessage({ message: polyglot.t('updateLearningPathStatus.updateStatusMsg') }));
      if (redirectUrl) {
        dispatch(routerActions.push({
          pathname: redirectUrl,
        }));
      }
    })
    .catch(err => dispatch(applicationError(err)));
}
