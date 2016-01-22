import { fetchAuthorized } from './helpers';

const sendLogout = fetchAuthorized('/auth/logout');

export default sendLogout;
