import { setIsValidOembed, removeLearningPathStepEmbedContent, updateLearningPathStepEmbedUrl } from '.';
import { fetchOembedUrl } from '../sources/learningpaths';

export default function validateOembed(url, lang) {
  if (!url || url.length === 0) {
    return ((dispatch) => {
      dispatch(removeLearningPathStepEmbedContent());
      dispatch(setIsValidOembed(true));
    });
  }

  return (dispatch, getState) => fetchOembedUrl(getState().authToken, {url})
    .then((oembed) => {
      dispatch(removeLearningPathStepEmbedContent());
      dispatch(updateLearningPathStepEmbedUrl(Object.assign({}, oembed, {url, language: lang})));
      dispatch(setIsValidOembed(true));
    })
    .catch(() => dispatch(setIsValidOembed(false)));
}
