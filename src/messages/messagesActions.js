import { createAction } from 'redux-actions';

export const applicationError = createAction('APPLICATION_ERROR');
export const addMessage = createAction('ADD_MESSAGE');
export const clearAllMessages = createAction('CLEAR_ALL_MESSAGES');
export const clearMessage = createAction('CLEAR_MESSAGE');

export function timeoutMessage(message) {
  return dispatch => setTimeout(
    () => dispatch(clearMessage(message.id)),
    message.timeToLive
  );
}
