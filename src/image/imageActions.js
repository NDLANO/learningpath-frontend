import { createAction } from 'redux-actions';
import { applicationError, changeImageSearchQuery } from '../actions';
import { fetchImages, fetchImage } from '../sources/images';
import pickBy from 'lodash/pickBy';
export const setImages = createAction('SET_IMAGES');
export const setImage = createAction('SET_IMAGE');

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
