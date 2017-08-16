/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import { convertFieldWithFallback } from '../util/convertFieldWithFallback';


export const getLearningPathWithState = state => state.learningPath;

export const getLearningPath = createSelector(
  [getLearningPathWithState],
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


export const getLearningPathSteps = createSelector(
  [getLearningPathWithState],
  (learningPath) => {
    if (learningPath.learningsteps) {
      return learningPath.learningsteps.map(step => ({
        ...step,
        title: convertFieldWithFallback(step, 'title', ''),
      }));
    }
    return [];
  });
