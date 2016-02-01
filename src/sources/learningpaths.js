import { fetchAuthorized } from './helpers';

const fetchPrivatePaths = fetchAuthorized('/learningpaths/private');


export {
  fetchPrivatePaths
};
