import 'isomorphic-fetch';
import { setUserData, setAuthToken, setAuthenticated, applicationError } from '.';
import fetchAboutMe from '../sources/fetchAboutMe';

export default function authenticationSuccess (authToken) {
  return dispatch => fetchAboutMe(authToken).then(user => [
    setAuthenticated(true),
    setAuthToken(authToken),
    setUserData(user)
  ].map( dispatch ))
  .catch(err => dispatch(applicationError(err)) );
}
