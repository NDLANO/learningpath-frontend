/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import defined from 'defined';
import { getLocale } from '../../locale/localeSelectors';

const getLearningPathSearchResultFromState = state => state.learningPathSearch.results;
const getLearningPathSearchTotalCountFromState = state => state.learningPathSearch.totalCount;

export const getLearningPathSearchResult = createSelector(
    [getLearningPathSearchResultFromState, getLocale],
    results => results.map(result => ({
      ...result,
      title: result.title,
      isBasedOnTitle: result.isBasedOnTitle,
      description: result.description,
      introduction: result.introduction,
      tags: defined(result.tags),
    }))
);

export const getLearningPathSearchTotalCount = createSelector(
    [getLearningPathSearchTotalCountFromState],
    totalCount => totalCount
);
