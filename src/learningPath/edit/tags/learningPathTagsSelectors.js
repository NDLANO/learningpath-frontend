/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import defined from 'defined';
import { getLocale } from '../../../locale/localeSelectors';

const getLearningPathTagsFromState = (state) => state.learningPathTags.all;

export const getLearningPathTags = createSelector(
    [getLearningPathTagsFromState],
    (tags) => tags
);

export const getLearningPathTagsByLanguage = createSelector(
    [getLearningPathTags, getLocale],
    (tags, lang) => {
      const language = defined(tags.find(tag => tag.language === lang), {});
      return defined(language.tags, []);
    }
);
