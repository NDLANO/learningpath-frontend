/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import defined from 'defined';
import { getLocale } from '../../locale/localeSelectors';

const getLearningPathStepFromState = state => state.learningPathStep;

export const getEmbedContent = state => state.oembedPreview.oembedContent;

export const getLearningPathSteps = createSelector(
  [getLearningPathStepFromState, getLocale],
  (learningPathStep, lang) => ({
    ...learningPathStep,
    language: lang,
    embedUrl: defined(learningPathStep.embedUrl, { url: '', embedType: '' }),
  })
);
