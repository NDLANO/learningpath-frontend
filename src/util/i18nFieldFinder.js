import find from 'lodash/find';

import createFieldByLanguageFinder from './createFieldByLanguageFinder';

const titleI18N = createFieldByLanguageFinder('title');
const descriptionI18N = createFieldByLanguageFinder('description');
const oembedI18N = createFieldByLanguageFinder('embedContent', 'html');
const oembedUrlI18N = createFieldByLanguageFinder('embedContent', 'url');
export { titleI18N, descriptionI18N, oembedUrlI18N, oembedI18N};

export function oembedContentI18N (learningPathStep, lang) {
  return find(learningPathStep.embedContent, {language: lang});
}
