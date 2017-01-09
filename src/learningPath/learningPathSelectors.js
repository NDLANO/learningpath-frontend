/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import defined from 'defined';
import { titleI18N, descriptionI18N, tagsI18N, isBasedOnTitleI18N } from '../util/i18nFieldFinder';
import { getLocale } from '../locale/localeSelectors';

export const getLearningPath = state => state.learningPath;

export const getLearningPathId = state => state.learningPath.id;

export const getI18nLearningPath = createSelector(
  [getLearningPath, getLocale],
  (learningPath, lang) => ({
    ...learningPath,
    title: titleI18N(learningPath, lang, true),
    isBasedOnTitle: isBasedOnTitleI18N(learningPath, lang, true),
    description: descriptionI18N(learningPath, lang, true),
    learningsteps: learningPath.learningsteps ? learningPath.learningsteps.map(step => ({
      ...step,
      title: titleI18N(step, lang, true),
    })) : [],
    tags: defined(tagsI18N(learningPath, lang, true), []),
  }));


export const getI18nLearningPathSteps = createSelector(
  [getLearningPath, getLocale],
  (learningPath, lang) => {
    if (learningPath.learningsteps) {
      return learningPath.learningsteps.map(step => ({
        ...step,
        title: titleI18N(step, lang, true),
      }));
    }
    return [];
  });
