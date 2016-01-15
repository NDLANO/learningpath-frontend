import session from '../sources/session';
import {
  authenticationSuccess,
  setUserData,
  setAuthToken,
  setAuthenticated
} from '../actions';

const restoreSession = store => next => action => {
  switch (action.type) {
  case 'RESTORE_SESSION':
    session.getToken().then(token => {
      if (token) {
        store.dispatch(authenticationSuccess(token));
        return;
      }
    });
    break;

  case 'LOGOUT':
    session.removeToken().then(() => [
      setAuthenticated(false),
      setAuthToken(''),
      setUserData({})
    ].forEach(action => store.dispatch(action)));
    return next(action);

  case 'SET_AUTH_TOKEN':
    if (!action.error) {
      session.storeToken(action.payload);
    }
    return next(action);

  default:
    return next(action);
  }
};

export default restoreSession;
