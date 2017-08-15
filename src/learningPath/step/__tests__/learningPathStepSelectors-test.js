/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { oembedPreview, learningStep } from '../../../common/__tests__/mockData';
import { getLearningPathSteps, getEmbedContent } from '../learningPathStepSelectors';
import { translatedLearningStep, nbOembedContent } from '../../../common/__tests__/translatedMockData';

test('selectors/getLearningPathSteps', () => {
  const state = {
    learningPathStep: learningStep,
    locale: 'nb',
  };

  expect(getLearningPathSteps(state)).toEqual(translatedLearningStep);
});


test('selectors/getEmbedContent norwegian', () => {
  const state = {
    oembedPreview,
    locale: 'nb',
  };

  expect(getEmbedContent(state)).toEqual(nbOembedContent);
});
