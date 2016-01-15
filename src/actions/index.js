import { createAction } from 'redux-actions';

import authenticationSuccess from './authenticationSuccess';

export var applicationError = createAction('APPLICATION_ERROR');
export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setUserData = createAction('SET_USER_DATA');
export { authenticationSuccess };

export default { applicationError, setAuthToken, setUserData, authenticationSuccess };
