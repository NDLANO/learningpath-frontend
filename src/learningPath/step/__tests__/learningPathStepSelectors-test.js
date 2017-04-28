/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { oembedPreview, learningStep } from '../../../common/__tests__/mockData';
import { getI18nLearningPathStep, getI18NEmbedContent } from '../learningPathStepSelectors';
import { translatedLearningStep, nbOembedContent, enOembedContent } from '../../../common/__tests__/translatedMockData';

test('selectors/getI18nLearningPathStep', () => {
  const state = {
    learningPathStep: learningStep,
    locale: 'nb',
  };

  expect(getI18nLearningPathStep(state)).toEqual(translatedLearningStep);
});


test('selectors/getI18NEmbedContent norwegian', () => {
  const state = {
    oembedPreview,
    locale: 'nb',
  };

  expect(getI18NEmbedContent(state)).toEqual(nbOembedContent);
});

test('selectors/getI18NEmbedContent english', () => {
  const state = {
    oembedPreview,
    locale: 'en',
  };

  expect(getI18NEmbedContent(state)).toEqual(enOembedContent);
});
