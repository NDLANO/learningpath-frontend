/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import defined from 'defined';
import { getLocale } from '../locale/localeSelectors';

export const getLearningPath = state => state.learningPath;

export const getLearningPathId = state => state.learningPath.id;

export const getI18nLearningPath = createSelector(
  [getLearningPath, getLocale],
  learningPath => ({
    ...learningPath,
    title: learningPath.title,
    isBasedOnTitle: learningPath.isBasedOnTitle,
    description: learningPath.description,
    learningsteps: learningPath.learningsteps ? learningPath.learningsteps.map(step => ({
      ...step,
      title: step.title,
    })) : [],
    tags: defined(learningPath.tags, []),
  }));
