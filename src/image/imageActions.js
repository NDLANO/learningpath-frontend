import { createAction } from 'redux-actions';
import { changeImageSearchQuery } from '../actions';
import { applicationError } from '../messages/messagesActions';
import { fetchImages, fetchImage, fetchImageWithMetaUrl } from '../sources/images';
import pickBy from 'lodash/pickBy';
export const setImages = createAction('SET_IMAGES');
export const setImage = createAction('SET_IMAGE');
export const setImagesSearchTime = createAction('SET_IMAGES_SEARCH_TIME');

function dispatchImagesReducers(images, dispatch, query) {
  dispatch(setImages(images));
  dispatch(changeImageSearchQuery(query));
}

export function fetchLearningPathImages(query, isFirstSearch) {
  console.log(query);
  console.log(isFirstSearch);
  return (dispatch) => fetchImages(pickBy(query))
    .then((images) => {
      if (images.totalCount === 0 && isFirstSearch) {
        const newQuery = {'page-size': query['page-size'], page: query.page};
        fetchImages(newQuery).then((newImages) => {
          dispatchImagesReducers(newImages, dispatch, newQuery);
        });
      } else {
        dispatchImagesReducers(images, dispatch, query);
      }
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
