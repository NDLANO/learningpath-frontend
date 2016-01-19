import { fetchAuthorized } from './helpers';

const fetchPrivatePaths = fetchAuthorized('/paths/private');


export {
  fetchPrivatePaths
};
