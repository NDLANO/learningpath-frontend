import { setIsValidOembed, removeLearningPathStepEmbedContent } from '.';
import { fetchOembedUrl } from '../sources/learningpaths';

export default function validateOembed (url) {
  if (!url || url.length === 0){
    return ((dispatch) => {
      dispatch(removeLearningPathStepEmbedContent());
      dispatch(setIsValidOembed(true));
    });
  }

  return (dispatch, getState) => fetchOembedUrl(getState().authToken, {'url': url})
    .then(() => dispatch(setIsValidOembed(true)))
    .catch(() => dispatch(setIsValidOembed(false)));
}
