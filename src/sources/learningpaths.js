import { fetchAuthorized } from './helpers';

const fetchPrivatePath  = fetchAuthorized('/learningpaths/private/:pathId');
const fetchPrivatePaths = fetchAuthorized('/learningpaths/private');

export {
  fetchPrivatePath,
  fetchPrivatePaths
};
