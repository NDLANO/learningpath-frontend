import 'isomorphic-fetch';
import { setUserData, setAuthToken, setAuthenticated, applicationError } from '.';
import { replacePath } from 'redux-simple-router';
import fetchAboutMe from '../sources/fetchAboutMe';

export default function authenticationSuccess (authToken) {
  return dispatch => fetchAboutMe(authToken).then(user => [
    setAuthenticated(true),
    setAuthToken(authToken),
    setUserData(user),
    replacePath('/')
  ].map( dispatch ))
  .catch(err => dispatch(applicationError(err)) );
}
