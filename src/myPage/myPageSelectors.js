/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import { convertFieldWithFallback } from '../util/convertFieldWithFallback';

const getLearningPathsWithState = state => state.learningPaths;
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

export const getLearningPaths = createSelector(
    [getLearningPathsWithState, getSortKey],
    (learningPaths, sortKey) => {
      const newLearningPaths = learningPaths.map(learningPath => ({
        ...learningPath,
        title: convertFieldWithFallback(learningPath, 'title', ''),
        description: convertFieldWithFallback(learningPath, 'description', ''),
        introduction: convertFieldWithFallback(learningPath, 'introduction', ''),
        tags: convertFieldWithFallback(learningPath, 'tags', []),
      }));
      return sortPaths(newLearningPaths, sortKey);
    }
);
