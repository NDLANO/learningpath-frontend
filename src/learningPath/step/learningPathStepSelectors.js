/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import { titleI18N, descriptionI18N, oembedUrlI18N, oembedContentI18N, embedTypeUrlI18N } from '../../util/i18nFieldFinder';
import { getLocale } from '../../locale/localeSelectors';

const getLearningPathStep = state => state.learningPathStep;

const getEmbedContent = state => state.oembedPreview.oembedContent;

export const getI18NEmbedContent = createSelector(
  [getEmbedContent, getLocale],
  (embedContent, lang) => ({
    ...oembedContentI18N({ embedUrl: embedContent }, lang),
  })
);

export const getI18nLearningPathStep = createSelector(
  [getLearningPathStep, getLocale],
  (learningPathStep, lang) => ({
    ...learningPathStep,
    title: titleI18N(learningPathStep, lang, true),
    description: descriptionI18N(learningPathStep, lang, true),
    embedUrl: {
      url: oembedUrlI18N(learningPathStep, lang, false),
      embedType: embedTypeUrlI18N(learningPathStep, lang, false),
    },
  })
);
