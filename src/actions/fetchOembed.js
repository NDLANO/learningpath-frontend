import { setOembedObject, applicationError } from '.';
import { fetchOembedUrl } from '../sources/learningpaths';

export default function fetchOembed(url) {
  return (dispatch, getState) => fetchOembedUrl(getState().authToken, {url})
    .then(object => dispatch(setOembedObject(object)))
    .catch(err => dispatch(applicationError(err)));
}
