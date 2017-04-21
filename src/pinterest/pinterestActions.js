/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { fetchPins } from '../sources/pinterestApi';
import { addMessage } from '../messages/messagesActions';
import polyglot from '../i18n';

export const setPins = createAction('SET_PINS');
export const setFetchingPins = createAction('SET_FETCHING_PINS');
export const removePins = createAction('REMOVE_PINS');

export function fetchPinterestPins(username, boardName) {
  return dispatch => fetchPins(username, boardName)
    .then((pins) => {
      dispatch(setPins(pins.data));
      dispatch(setFetchingPins(false));
    }).catch(() => {
      dispatch(setFetchingPins(false));
      dispatch(addMessage({ message: polyglot.t('pinterest.error'), timeToLive: 7000, severity: 'danger' }));
    });
}
