import { createAction } from 'redux-actions';

import { applicationError } from '.';
import sendLogout from '../sources/sendLogout';

const logoutAction = createAction('LOGOUT');

export default function logout () {
  return (dispatch, getState) => sendLogout( getState().authToken )
    .then(() => dispatch(logoutAction()))
    .catch(err => dispatch(applicationError(err)));
}
