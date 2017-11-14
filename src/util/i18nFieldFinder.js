/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import defined from 'defined';

import { findFallbackTranslation } from './createFieldByLanguageFinder';

export function oembedContentI18N(
  learningPathStep,
  lang,
  withFallback = false,
) {
  const translations = defined(learningPathStep.embedUrl, []);
  return defined(
    translations.find(d => d.language === lang),
    withFallback ? findFallbackTranslation(translations) : undefined,
  );
}
