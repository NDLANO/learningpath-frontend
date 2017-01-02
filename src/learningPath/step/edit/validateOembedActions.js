/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { change } from 'redux-form';
import get from 'lodash/get';
import { fetchOembedUrl } from '../../../sources/learningpaths';
import polyglot from '../../../i18n';

export const removeOembedPreview = createAction('REMOVE_OEMBED_PREVIEW');
export const setOembedPreview = createAction('SET_OEMBED_PREVIEW');

export function validateOembed(url, lang, embedType = 'omebed', fieldName = 'url', msgKey = 'validation.oembed') {
  if (!url || url.length === 0) {
    return (dispatch => new Promise((resolve) => {
      dispatch(removeOembedPreview());
      resolve();
    }));
  }
  if (embedType === 'lti') {
    return (dispatch => new Promise((resolve) => {
      const oembed = { html: `<iframe src="${url}"/>` };
      dispatch(setOembedPreview(Object.assign({}, oembed, { url, embedType, language: lang })));
      resolve();
    }));
  }

  return (dispatch, getState) => new Promise((resolve, reject) => fetchOembedUrl(getState().authToken, { url })
    .then((oembed) => {
      const state = getState();
      const currentOembedTitle = get(state, 'oembedPreview.oembedContent[0].title');
      const currentFormTitle = get(state, 'form.learning-path-step.values.title');

      dispatch(setOembedPreview(Object.assign({}, oembed, { url, embedType, language: lang })));

      if (oembed.title && (!currentFormTitle || currentOembedTitle === currentFormTitle)) {
        dispatch(change('learning-path-step', 'title', oembed.title));
      }
      resolve();
    })
    .catch(
      () => reject({ [fieldName]: polyglot.t(msgKey, lang) })
    )
  );
}
