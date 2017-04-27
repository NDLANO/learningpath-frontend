/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { learningPath } from '../../common/__tests__/mockData';
import { getI18nLearningPath, getI18nLearningPathSteps, getLearningPathId } from '../learningPathSelectors';
import { translatedLearningPath } from '../../common/__tests__/translatedMockData';

test('selectors/getI18nLearningPath', () => {
  const state = {
    learningPath,
    locale: 'nb',
  };

  expect(getI18nLearningPath(state)).toEqual(translatedLearningPath);
});

test('selectors/getI18nLearningPathSteps', () => {
  const state = {
    learningPath,
    locale: 'nb',
  };
  expect(getI18nLearningPathSteps(state)).toEqual(translatedLearningPath.learningsteps);
});

test('selectors/getLearningPathId', () => {
  const state = {
    learningPath,
    locale: 'nb',
  };
  expect(getLearningPathId(state)).toBe(translatedLearningPath.id);
});
