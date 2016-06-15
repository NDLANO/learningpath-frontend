import { createAction } from 'redux-actions';
import { applicationError, addMessage } from '../actions';
import { fetchImages } from '../sources/images';
import polyglot from '../i18n';

export const setImages = createAction('SET_IMAGES');

export function fetchLearningPathImages() {
  return (dispatch, getState) => fetchImages(getState().authToken)
    .then((images) => {
      dispatch(setImages(images));
      dispatch(addMessage({message: polyglot.t('updateLearningPath.updatedMsg')}));
    })
    .catch(err => dispatch(applicationError(err)));
}
