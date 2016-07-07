import { createAction } from 'redux-actions';

import { fetchOembedUrl } from '../sources/learningpaths';
import polyglot from '../i18n';

export const removeOembedPreview = createAction('REMOVE_OEMBED_PREVIEW');
export const setOembedPreview = createAction('SET_OEMBED_PREVIEW');

export default function validateOembed(url, lang, fieldName = 'url', msgKey = 'validation.oembed') {
  if (!url || url.length === 0) {
    return ((dispatch) => new Promise((resolve) => {
      dispatch(removeOembedPreview());
      resolve();
    }));
  }

  return (dispatch, getState) => new Promise((resolve, reject) => fetchOembedUrl(getState().authToken, { url })
    .then((oembed) => {
      dispatch(setOembedPreview(Object.assign({}, oembed, { url, language: lang })));
      resolve();
    })
    .catch(
      () => reject({ [fieldName]: polyglot.t(msgKey, lang) })
    )
  );
}
