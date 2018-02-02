/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import requireAssets from '../util/requireAssets';

const imageSource = pagemap => {
  if (pagemap && pagemap.cse_thumbnail && pagemap.cse_thumbnail.length > 0) {
    return pagemap.cse_thumbnail[0].src;
  }
  return `/assets/${requireAssets['placeholder.png']}`;
};

const getTotalResultsFromState = (state, type) => {
  const result = state.embedSearch[type].result;
  return result.queries.request
    ? result.queries.request[0].totalResults
    : undefined;
};

export const getNumberOfPages = createSelector(
  [getTotalResultsFromState],
  totalResults => {
    const numberOfPages = totalResults ? Math.ceil(totalResults / 10) : 1;
    return numberOfPages > 10 ? 10 : numberOfPages;
  },
);

export const getEmbedResultFromState = (state, type) => {
  const result = state.embedSearch[type].result;
  return result && result.items
    ? result.items.map(item => ({
        id: item.cacheId,
        title: item.title,
        link: item.link,
        introduction: item.snippet,
        thumbnail: imageSource(item.pagemap),
        showUrl: true,
      }))
    : [];
};

export const getEmbedQueryFromState = (state, type) =>
  state.embedSearch[type].query;

export const getOembedContentFromState = (state, type) =>
  state.embedSearch[type].oembedContent;
