/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import defined from 'defined';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import { getLocale } from '../locale/localeSelectors';

const getLearningPaths = state => state.learningPaths;
export const getSortKey = state => state.myLearningPathsSortOrder || 'title';

const sortPaths = (paths, field) => {
  switch (field) {
    case 'title':
      return sortBy(paths, p => p.title);

    case 'lastUpdated':
      return sortBy(paths, field);

    case '-lastUpdated':
      return reverse(sortBy(paths, 'lastUpdated'));

    case 'status':
      return reverse(sortBy(paths, 'status'));

    default:
      return sortBy(paths, field);
  }
};

export const getI18NLearningPaths = createSelector(
    [getLearningPaths, getLocale, getSortKey],
    (learningPaths, lang, sortKey) => {
      const newLearningPaths = learningPaths.map(learningPath => ({
        ...learningPath,
        title: learningPath.title,
        description: learningPath.description,
        introduction: learningPath.introduction,
        tags: defined(learningPath.tags, []),
      }));
      return sortPaths(newLearningPaths, sortKey);
    }
);
