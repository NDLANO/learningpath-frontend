/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import { convertFieldWithFallback } from '../util/convertFieldWithFallback';


export const getLearningPath = state => state.learningPath;

export const getLearningPathId = state => state.learningPath.id;

export const getI18nLearningPath = createSelector(
  [getLearningPath],
  learningPath => ({
    ...learningPath,
    title: convertFieldWithFallback(learningPath, 'title', ''),
    description: convertFieldWithFallback(learningPath, 'description', ''),
    learningsteps: learningPath.learningsteps ? learningPath.learningsteps.map(step => ({
      ...step,
      title: convertFieldWithFallback(step, 'title', ''),
    })) : [],
    tags: convertFieldWithFallback(learningPath, 'tags', []),
  }));


export const getI18nLearningPathSteps = createSelector(
  [getLearningPath],
  (learningPath) => {
    if (learningPath.learningsteps) {
      return learningPath.learningsteps.map(step => ({
        ...step,
        title: convertFieldWithFallback(step, 'title', ''),
      }));
    }
    return [];
  });
