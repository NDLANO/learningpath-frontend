import { clearMessage } from '.';

export default function timeoutMessage(message) {
  return dispatch => setTimeout(
    () => dispatch(clearMessage(message.id)),
    message.timeToLive
  );
}
