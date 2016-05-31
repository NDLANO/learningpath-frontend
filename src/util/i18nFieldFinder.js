import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';

import createFieldByLanguageFinder from './createFieldByLanguageFinder';

const titleI18N = createFieldByLanguageFinder('title');
const descriptionI18N = createFieldByLanguageFinder('description');
const oembedI18N = createFieldByLanguageFinder('embedContent', 'html');
const oembedUrlI18N = createFieldByLanguageFinder('embedContent', 'url');
export { titleI18N, descriptionI18N, oembedUrlI18N, oembedI18N};

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
