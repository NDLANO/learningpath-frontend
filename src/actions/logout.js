import { logoutAction } from '.';
import { applicationError } from '../messages/messagesActions';
import sendLogout from '../sources/sendLogout';

export default function logout() {
  return (dispatch, getState) => sendLogout(getState().authToken)
    .then(() => dispatch(logoutAction()))
    .catch(err => dispatch(applicationError(err)));
}
