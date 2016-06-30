import defined from 'defined';

import createFieldByLanguageFinder, { findFallbackTranslation } from './createFieldByLanguageFinder';

export const titleI18N = createFieldByLanguageFinder('title');
export const descriptionI18N = createFieldByLanguageFinder('description');
export const oembedUrlI18N = createFieldByLanguageFinder('embedContent', 'url');
export const tagsI18N = createFieldByLanguageFinder('tags');


export function oembedContentI18N(learningPathStep, lang, withFallback = false) {
  const translations = defined(learningPathStep.embedContent, []);
  return defined(translations.find(d => d.language === lang), withFallback ? findFallbackTranslation(translations) : undefined);
}
