const createFieldByLanguageFinder = fieldName => (obj, lang) => obj[fieldName].find(d => d.language === lang)[fieldName];

export default createFieldByLanguageFinder;
