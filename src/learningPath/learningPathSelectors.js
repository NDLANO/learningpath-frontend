/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';

export const getLearningPath = state => state.learningPath;

export const getLearningPathId = state => state.learningPath.id;

export const getI18nLearningPath = createSelector(
  [getLearningPath],
  learningPath => learningPath
);

export const getI18nLearningPathSteps = createSelector(
  [getLearningPath],
  learningPath => learningPath.learningsteps
);
