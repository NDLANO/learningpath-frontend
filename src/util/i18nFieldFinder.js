import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';

import createFieldByLanguageFinder from './createFieldByLanguageFinder';

const titleI18N = createFieldByLanguageFinder('title');
const descriptionI18N = createFieldByLanguageFinder('description');
const introductionI18N = createFieldByLanguageFinder('introduction');
const oembedI18N = createFieldByLanguageFinder('embedContent', 'html');
const oembedUrlI18N = createFieldByLanguageFinder('embedContent', 'url');
const tagI18N = createFieldByLanguageFinder('tags');
export { titleI18N, descriptionI18N, oembedUrlI18N, oembedI18N, tagI18N, introductionI18N};

export function oembedContentI18N(learningPathStep, lang) {
  return find(learningPathStep.embedContent, {language: lang});
}

export function pushOrAssignLanguageValue(array, propertyName, value, language) {
  const cloned = cloneDeep(array);
  const index = findIndex(cloned, ['language', language]);
  const valueWithLanguage = { [propertyName]: value, language};

  if (!value) {
    return array;
  } else if (index === -1) {
    cloned.push(valueWithLanguage);
    return cloned;
  }
  cloned[index] = valueWithLanguage;
  return cloned;
}

export function filterFieldsByLanguage(array, language) {
  const cloned = cloneDeep(array);
  const filterByLanguage = (obj) => obj.language && obj.language === language;
  return cloned.filter(filterByLanguage);
}
