/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import requireAssets from '../util/requireAssets';
import { convertFieldWithFallback } from '../util/convertFieldWithFallback';
import config from '../config';

const ndlaFrontendUrl = __SERVER__
  ? config.ndlaFrontendDomain
  : window.config.ndlaFrontendDomain;

const getTotalResultsFromState = state => {
  const result = state.embedSearch.ndla.result;
  return result.totalCount ? result.totalCount / result.pageSize : 0;
};

export const getNumberOfArticlePages = createSelector(
  [getTotalResultsFromState],
  totalResults => (totalResults ? Math.ceil(totalResults / 10) : 1),
);

export const getArticleResultFromState = state => {
  const results =
    state.embedSearch.ndla.result && state.embedSearch.ndla.result.results
      ? state.embedSearch.ndla.result.results
      : [];
  return results.map(item => ({
    id: item.id,
    description: convertFieldWithFallback(item, 'introduction', ''),
    title: convertFieldWithFallback(item, 'title', ''),
    link: item.link || `${ndlaFrontendUrl}/article/${item.id}`,
    thumbnail: `/assets/${requireAssets['placeholder.png']}`,
    showUrl: false,
    disable: item.disable,
  }));
};

export const getEmbedQueryFromState = (state, type) =>
  state.embedSearch.ndla.query;

export const getOembedContentFromState = (state, type) =>
  state.embedSearch[type].oembedContent;
