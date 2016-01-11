import { createAction } from 'redux-actions';

export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setUserData = createAction('SET_USER_DATA');

export default { setAuthToken, setUserData };
