import { createAction } from 'redux-actions';
import { changeImageSearchQuery } from '../actions';
import { applicationError } from '../messages/messagesActions';
import { fetchImages, fetchImage, fetchImageWithMetaUrl } from '../sources/images';
import pickBy from 'lodash/pickBy';
export const setImages = createAction('SET_IMAGES');
export const setImage = createAction('SET_IMAGE');
export const setImagesSearchTime = createAction('SET_IMAGES_SEARCH_TIME');
export function fetchLearningPathImages(query) {
  return (dispatch) => fetchImages(pickBy(query))
    .then((images) => {
      dispatch(setImages(images));
      dispatch(changeImageSearchQuery(query));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function fetchLearningPathImage(imageId) {
  return (dispatch) => fetchImage(imageId)
    .then((image) => {
      dispatch(setImage(image));
    })
    .catch(err => dispatch(applicationError(err)));
}
export function fetchLearningPathImageWithMetaUrl(url) {
  return (dispatch) => fetchImageWithMetaUrl(url)
    .then((image) => {
      dispatch(setImage(image));
    })
    .catch(err => dispatch(applicationError(err)));
}
