import createFieldByLanguageFinder from './createFieldByLanguageFinder';

const titleI18N = createFieldByLanguageFinder('title');
const descriptionI18N = createFieldByLanguageFinder('description');
const embedUrlI18N = createFieldByLanguageFinder('embedUrl', 'url');

export { titleI18N, descriptionI18N, embedUrlI18N };
