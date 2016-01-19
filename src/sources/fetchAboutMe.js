import { fetchAuthorized } from './helpers';

const fetchAboutMe = fetchAuthorized('/auth/me');

export default fetchAboutMe;
