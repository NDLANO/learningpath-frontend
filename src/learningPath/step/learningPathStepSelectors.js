/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import { convertFieldWithFallback } from '../../util/convertFieldWithFallback';

import { oembedContentI18N } from '../../util/i18nFieldFinder';
import { getLocale } from '../../locale/localeSelectors';

const getLearningPathStepWithState = state => state.learningPathStep;

const getEmbedContentWithState = state => state.oembedPreview.oembedContent;

export const getI18NEmbedContent = createSelector(
  [getEmbedContentWithState, getLocale],
  (embedContent, lang) => ({
    ...oembedContentI18N({ embedUrl: embedContent }, lang),
  })
);

export const getLearningPathStep = createSelector(
  [getLearningPathStepWithState],
  learningPathStep => ({
    ...learningPathStep,
    title: convertFieldWithFallback(learningPathStep, 'title', ''),
    description: convertFieldWithFallback(learningPathStep, 'description', ''),
  })
);
