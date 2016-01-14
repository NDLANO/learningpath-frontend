import 'isomorphic-fetch';
import { setUserData, setAuthToken } from '.';
import { replacePath } from 'redux-simple-router';

export default function authenticationSuccess (authToken) {
  return dispatch => {
    dispatch(setAuthToken(authToken));
    fetch('http://localhost:8080/auth/me', {
      method: 'GET',
      headers: {'APP-KEY': authToken}
    })
      .then(res => res.json())
      .then(user => dispatch( setUserData(user) ))
      .then(() => dispatch(replacePath('/')))
      .catch(err => { console.error(err); });
  };
}
