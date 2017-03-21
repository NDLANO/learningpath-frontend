import auth0 from 'auth0-js';
import decode from 'jwt-decode';
import { routerActions } from 'react-router-redux';
import { locationOrigin } from '../sources/helpers';
import { setAuthenticated, setAccessToken, setUserData, logoutAction } from '../session/sessionActions';
import { isTokenExpired } from './jwtHelper';
import fetchTokenOnLogout from '../sources/fetchTokenOnLogout';
import { applicationError } from '../messages/messagesActions';

const auth = new auth0.WebAuth({
  clientID: '25sRFeGU4iqARHylaIArs8xzTo1I4jn9',
  domain: 'ndla.eu.auth0.com',
  responseType: 'token id_token',
  redirectUri: `${locationOrigin}/login/success`,
  scope: 'openid app_metadata name',
});

const decodeIdToken = idToken => decode(idToken);

export function parseHash(hash) {
  return (dispatch) => {
    auth.parseHash({ hash, _idTokenVerification: false }, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        dispatch(setAccessToken(authResult.idToken));
        dispatch(setAuthenticated(true));
        dispatch(setUserData(decodeIdToken(authResult.idToken)));
        dispatch(routerActions.replace('/minside'));
      }
    });
  };
}

export function loginSocialMedia(type) {
  auth.authorize({
    connection: type,
  });
}

export function loggedIn() {
  // Checks if there is a saved token and it's still vali
  return (dispatch, getState) => {
    const token = getState().accessToken;
    return !!token && !isTokenExpired(token);
  };
}

export function logout() {
  return dispatch => fetchTokenOnLogout
    .then((token) => {
      dispatch(logoutAction(token.access_token));
    })
    .catch(err => dispatch(applicationError(err)));
}
