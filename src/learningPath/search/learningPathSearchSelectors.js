/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import defined from 'defined';
import { titleI18N, descriptionI18N, introductionI18N, tagsI18N, isBasedOnTitleI18N } from '../../util/i18nFieldFinder';
import { getLocale } from '../../locale/localeSelectors';

const getLearningPathSearchResultFromState = state => state.learningPathSearch.results;
const getLearningPathSearchTotalCountFromState = state => state.learningPathSearch.totalCount;

export const getLearningPathSearchResult = createSelector(
    [getLearningPathSearchResultFromState, getLocale],
    (results, lang) => results.map(result => ({
      ...result,
      title: titleI18N(result, lang, true),
      isBasedOnTitle: isBasedOnTitleI18N(result, lang, true),
      description: descriptionI18N(result, lang, true),
      introduction: introductionI18N(result, lang, true),
      tags: defined(tagsI18N(result, lang, false), []),
    }))
);

export const getLearningPathSearchTotalCount = createSelector(
    [getLearningPathSearchTotalCountFromState],
    totalCount => totalCount
);
