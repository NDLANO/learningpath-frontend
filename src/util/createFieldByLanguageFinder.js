import defined from 'defined';

const createFieldByLanguageFinder = fieldName => (obj, lang) => defined(defined(defined(obj, {})[fieldName], []).find(d => d.language === lang), {})[fieldName];

export default createFieldByLanguageFinder;
