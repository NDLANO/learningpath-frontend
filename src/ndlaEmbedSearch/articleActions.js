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
import { fetchArticles } from '../sources/articles';

export const setEmbedPreview = createAction('SET_EMBED_PREVIEW');
export const setEmbedResults = createAction('SET_EMBED_RESULTS');
export const removeEmbedPreview = createAction('REMOVE_EMBED_PREVIEW');
export const changeEmbedSearchQuery = createAction('CHANGE_EMBED_SEARCH_QUERY');

export function fetchArticleSearch(query) {
  return (dispatch, getState) =>
    fetchArticles(query)
      .then(result => {
        dispatch(setEmbedResults({ type: 'ndla', result }));
      })
      .catch(err => dispatch(applicationError(err)));
}
