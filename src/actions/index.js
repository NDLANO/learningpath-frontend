import { createAction } from 'redux-actions';

import authenticationSuccess from './authenticationSuccess';

export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setUserData = createAction('SET_USER_DATA');
export { authenticationSuccess };

export default { setAuthToken, setUserData, authenticationSuccess };
