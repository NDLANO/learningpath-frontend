import queryString from 'query-string';
import config from '../config';
import { resolveJsonOrRejectWithError } from './helpers';

const fetchGoogleContent = (query) => {
  let url = config.GOOGLE_API_URL;
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
