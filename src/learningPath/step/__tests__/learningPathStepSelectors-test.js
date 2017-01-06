/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { oembedPreview, learningStep } from '../../../common/__tests__/mockData';
import { getI18nLearningPathStep, getI18NEmbedContent } from '../learningPathStepSelectors';
import { translatedLearningStep, nbOembedContent, enOembedContent } from '../../../common/__tests__/translatedMockData';

test('selectors/getI18nLearningPathStep', (t) => {
  const state = {
    learningPathStep: learningStep,
    locale: 'nb',
  };

  t.deepEqual(
    getI18nLearningPathStep(state),
    translatedLearningStep,
    'translate learningpath step correctly'
  );
  t.end();
});


test('selectors/getI18NEmbedContent norwegian', (t) => {
  const state = {
    oembedPreview,
    locale: 'nb',
  };

  t.deepEqual(
    getI18NEmbedContent(state),
    nbOembedContent,
    'translate learningpath step correctly'
  );
  t.end();
});

test('selectors/getI18NEmbedContent english', (t) => {
  const state = {
    oembedPreview,
    locale: 'en',
  };

  t.deepEqual(
    getI18NEmbedContent(state),
    enOembedContent,
    'translate oembedContent correctly'
  );
  t.end();
});
