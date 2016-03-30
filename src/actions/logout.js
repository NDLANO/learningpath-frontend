import { createAction } from 'redux-actions';

import { applicationError, logoutAction } from '.';
import sendLogout from '../sources/sendLogout';

export default function logout () {
  return (dispatch, getState) => sendLogout( getState().authToken )
    .then(() => dispatch(logoutAction()))
    .catch(err => dispatch(applicationError(err)));
}
