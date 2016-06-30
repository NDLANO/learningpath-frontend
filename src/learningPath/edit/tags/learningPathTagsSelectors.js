import { createSelector } from 'reselect';
import defined from 'defined';

const getLearningPathTagsFromState = (state) => state.learningPathTags.all;

export const getLearningPathTags = createSelector(
    [getLearningPathTagsFromState],
    (tags) => tags
);

export const getLearningPathTagsByLanguage = createSelector(
    [getLearningPathTags],
    (tags, lang) => {
      const language = defined(tags.find(tag => tag.language === lang), {});
      return defined(language.tags, []);
    }
);
