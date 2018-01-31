/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { applicationError } from '../messages/messagesActions';
import { fetchArticles } from '../sources/articles';
import { fetchResource } from '../sources/taxonomy';
import config from '../config';

const ndlaFrontendUrl = __SERVER__
  ? config.ndlaFrontendDomain
  : window.config.ndlaFrontendDomain;

export const setEmbedPreview = createAction('SET_EMBED_PREVIEW');
export const setEmbedResults = createAction('SET_EMBED_RESULTS');
export const removeEmbedPreview = createAction('REMOVE_EMBED_PREVIEW');
export const changeEmbedSearchQuery = createAction('CHANGE_EMBED_SEARCH_QUERY');

export function fetchArticleSearch(query) {
  return async dispatch => {
    try {
      const result = await fetchArticles(query);
      const newItems = await Promise.all(
        result.results.map(async item => {
          const resource = await fetchResource(item.id);
          return {
            ...item,
            link:
              resource.length > 0
                ? `${ndlaFrontendUrl}/article${resource[0].path
                    .split('/')
                    .join('/urn:')}/${item.id}`
                : undefined, // TODO: Find a better way to use taxonomy api.
            disable: resource.length === 0,
          };
        }),
      );
      dispatch(
        setEmbedResults({
          type: 'ndla',
          result: { ...result, results: newItems },
        }),
      );
    } catch (err) {
      dispatch(applicationError(err));
    }
  };
  /* return (dispatch) =>
    fetchArticles(query)
      .then(result => {
        dispatch(setEmbedResults({ type: 'ndla', result }));
      })
      .catch(err => dispatch(applicationError(err)));
      */
}
