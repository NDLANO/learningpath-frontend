import defined from 'defined';

const createFieldByLanguageFinder = (fieldName, propName) =>

  (obj, lang) => defined(
      defined(
        defined(obj, {})[fieldName], []).find(d => d.language === lang),
      {}
    )[defined(propName, fieldName)];

export default createFieldByLanguageFinder;
