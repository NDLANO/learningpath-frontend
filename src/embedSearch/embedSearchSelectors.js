/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';

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

export const getEmbedResultFromState = (state, type) =>
  state.embedSearch[type].result;

export const getEmbedQueryFromState = (state, type) =>
  state.embedSearch[type].query;

export const getOembedContentFromState = (state, type) =>
  state.embedSearch[type].oembedContent;
