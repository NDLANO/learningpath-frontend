/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';

const getLearningPathSearchResultFromState = state => state.learningPathSearch.results;
const getLearningPathSearchTotalCountFromState = state => state.learningPathSearch.totalCount;

export const getLearningPathSearchResult = createSelector(
    [getLearningPathSearchResultFromState],
    results => results
);

export const getLearningPathSearchTotalCount = createSelector(
    [getLearningPathSearchTotalCountFromState],
    totalCount => totalCount
);
