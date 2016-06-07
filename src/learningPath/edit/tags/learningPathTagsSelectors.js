import { createSelector } from 'reselect';

const getLearningPathTagsFromState = (state) => state.learningPathTags.all;
const getLang = (_, lang) => lang;

export const getLearningPathTags = createSelector(
    [getLearningPathTagsFromState],
    (tags) => tags
);

export const getLearningPathTagsByLanguage = createSelector(
    [getLearningPathTags, getLang],
    (tags, lang) => tags.filter(tag => tag.language === lang)
);

export const getLearningPathTagsByLanguageFlatten = createSelector(
    [getLearningPathTagsByLanguage],
    (tags) => tags.map(tag => tag.tag)
);
