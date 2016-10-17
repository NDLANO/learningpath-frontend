import queryString from 'query-string';
import config from '../config';
import { resolveJsonOrRejectWithError } from './helpers';

const GOOGLE_URL = 'https://www.googleapis.com/customsearch/v1';

const fetchGoogleContent = (query) => {
  let url = GOOGLE_URL;
  const params = {
    key: config.GOOGLE_API_KEY,
    cx: config.GOOGLE_SEARCH_ENGINE_ID,
    q: `${query.q} ${query.filter}`,
    start: query.start ? query.start : undefined,
  };
  url += `?${queryString.stringify(params)}`;
  return fetch(url).then(resolveJsonOrRejectWithError);
};

export {
  fetchGoogleContent,
};
