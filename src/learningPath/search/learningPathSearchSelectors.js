/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import { convertFieldWithFallback } from '../../util/convertFieldWithFallback';

const getLearningPathSearchResultFromState = state => state.learningPathSearch.results;
const getLearningPathSearchTotalCountFromState = state => state.learningPathSearch.totalCount;

export const getLearningPathSearchResult = createSelector(
    [getLearningPathSearchResultFromState],
    results => results.map(result => ({
      ...result,
      title: convertFieldWithFallback(result, 'title', ''),
      description: convertFieldWithFallback(result, 'description', ''),
      introduction: convertFieldWithFallback(result, 'introduction', ''),
      tags: convertFieldWithFallback(result, 'tags', []),
    }))
);

export const getLearningPathSearchTotalCount = createSelector(
    [getLearningPathSearchTotalCountFromState],
    totalCount => totalCount
);
