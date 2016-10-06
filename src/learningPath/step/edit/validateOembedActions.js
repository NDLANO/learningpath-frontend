/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { change } from 'redux-form';
import { fetchOembedUrl } from '../../../sources/learningpaths';
import polyglot from '../../../i18n';

export const removeOembedPreview = createAction('REMOVE_OEMBED_PREVIEW');
export const setOembedPreview = createAction('SET_OEMBED_PREVIEW');

export function validateOembed(url, lang, fieldName = 'url', msgKey = 'validation.oembed') {
  if (!url || url.length === 0) {
    return (dispatch => new Promise((resolve) => {
      dispatch(removeOembedPreview());
      resolve();
    }));
  }

  return (dispatch, getState) => new Promise((resolve, reject) => fetchOembedUrl(getState().authToken, { url })
    .then((oembed) => {
      dispatch(setOembedPreview(Object.assign({}, oembed, { url, language: lang })));
      const state = getState();
      if (oembed.title && state.form['learning-path-step'] && state.form['learning-path-step'].values && !state.form['learning-path-step'].values.title) {
        dispatch(change('learning-path-step', 'title', oembed.title));
      }
      resolve();
    })
    .catch(
      () => reject({ [fieldName]: polyglot.t(msgKey, lang) })
    )
  );
}
