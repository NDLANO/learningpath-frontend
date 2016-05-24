import { setIsValidOembed, removeLearningPathStepEmbedContent, updateLearningPathStepEmbedUrl } from '.';
import { fetchOembedUrl } from '../sources/learningpaths';

export default function validateOembed(url, lang) {
  if (!url || url.length === 0) {
    return ((dispatch) => {
      dispatch(removeLearningPathStepEmbedContent());
      dispatch(setIsValidOembed(true));
    });
  }

  return (dispatch, getState) => fetchOembedUrl(getState().authToken, {'url': url})
    .then((oembed) => {
      oembed.url = url;
      oembed.language = lang;
      dispatch(removeLearningPathStepEmbedContent());
      dispatch(updateLearningPathStepEmbedUrl(oembed));
      dispatch(setIsValidOembed(true));
    })
    .catch(() => dispatch(setIsValidOembed(false)));
}
