/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { applicationError } from '../messages/messagesActions';
import { fetchGoogleContent } from '../sources/embedSearch';
import { fetchOembedUrl } from '../sources/learningpaths';
import { getNumberOfPages } from './embedSearchSelectors';
import transformHttpToHttps from '../util/urlTransformer';

export const setEmbedPreview = createAction('SET_EMBED_PREVIEW');
export const setEmbedResults = createAction('SET_EMBED_RESULTS');
export const removeEmbedPreview = createAction('REMOVE_EMBED_PREVIEW');
export const changeEmbedSearchQuery = createAction('CHANGE_EMBED_SEARCH_QUERY');

function fetchEmbedSearch(query, type) {
  return (dispatch, getState) => fetchGoogleContent(query)
    .then((result) => {
      const newResult = (type === 'ndla') ? { ...result, items: result.items.map(item => ({ ...item, link: transformHttpToHttps(item.link) })) } : result;
      dispatch(setEmbedResults({ type, result: newResult }));
    })
    .then(() => {
      const updatedQuery = Object.assign({}, query, { numberOfPages: getNumberOfPages(getState(), type) });
      dispatch(changeEmbedSearchQuery({ type, query: updatedQuery }));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function fetchExternalEmbedSearch(query) {
  return fetchEmbedSearch(query, 'external');
}

export function fetchNdlaEmbedSearch(query) {
  return fetchEmbedSearch(query, 'ndla');
}


function fetchOembed(url, lang, type) {
  return (dispatch, getState) => fetchOembedUrl(getState().authToken, { url })
    .then((oembed) => {
      dispatch(setEmbedPreview({ type, oembedContent: Object.assign({}, oembed, { url, language: lang }) }));
    })
    .catch((err) => {
      dispatch(setEmbedPreview({ type, oembedContent: { error: true, url } }));
      dispatch(applicationError(err));
    });
}

export function fetchExternalOembed(url, lang) {
  return fetchOembed(url, lang, 'external');
}

export function fetchNdlaOembed(url, lang) {
  return fetchOembed(url, lang, 'ndla');
}
