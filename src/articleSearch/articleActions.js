/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { applicationError } from '../messages/messagesActions';
import { fetchArticles } from '../sources/articles';
import { fetchResource } from '../sources/taxonomy';
import config from '../config';
import {
  changeEmbedSearchQuery,
  setEmbedResults,
} from '../embedSearch/embedSearchActions';
import { getNumberOfArticlePages } from './articleSelectors';

const ndlaFrontendUrl = config.ndlaFrontendDomain;

export function fetchArticleSearch(query, language) {
  const ndlaQuery = {
    query: query.textQuery,
    page: query.page,
    'page-size': 10,
    language,
  };
  return async (dispatch, getState) => {
    try {
      const result = await fetchArticles(ndlaQuery);
      const newItems = await Promise.all(
        result.results.map(async item => {
          const resource = await fetchResource(item.id);
          return {
            ...item,
            link:
              resource.length > 0
                ? `${ndlaFrontendUrl}/subjects${resource[0].path}`
                : `${ndlaFrontendUrl}/article/${item.id}`, // TODO: Find a better way to use taxonomy paths.
          };
        }),
      );
      await dispatch(
        setEmbedResults({
          type: 'ndla',
          result: { ...result, results: newItems },
        }),
      );
      const updatedQuery = Object.assign({}, query, {
        numberOfPages: getNumberOfArticlePages(getState()),
      });
      dispatch(changeEmbedSearchQuery({ type: 'ndla', query: updatedQuery }));
    } catch (err) {
      dispatch(applicationError(err));
    }
  };
}
