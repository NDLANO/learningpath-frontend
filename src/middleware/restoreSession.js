import session from '../sources/session';
import { authenticationSuccess } from '../actions';

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
