import { setOembedObject, applicationError } from '.';
import { fetchOembedUrl } from '../sources/learningpaths';

export default function validateOembed (url) {
  return (dispatch, getState) => fetchOembedUrl(getState().authToken, {'url': url})
    .then(dispatch(setIsValidOembed(true)))
    .catch(dispatch(setIsValidOembed(false)));
}
