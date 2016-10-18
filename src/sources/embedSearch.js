import queryString from 'query-string';
import config from '../config';
import { resolveJsonOrRejectWithError } from './helpers';

const GOOGLE_API_URL = __SERVER__ ? config.googleApiUrl : window.config.googleApiUrl;
const GOOGLE_API_KEY = __SERVER__ ? config.googleApiKey : window.config.googleApiKey;
const GOOGLE_SEARCH_ENGINE_ID = __SERVER__ ? config.googleSearchEngineId : window.config.googleSearchEngineId;


const fetchGoogleContent = (query) => {
  let url = GOOGLE_API_URL;
  const params = {
    key: GOOGLE_API_KEY,
    cx: GOOGLE_SEARCH_ENGINE_ID,
    q: `${query.textQuery} ${query.filter}`,
    start: query.start ? query.start : undefined,
  };
  url += `?${queryString.stringify(params)}`;
  return fetch(url).then(resolveJsonOrRejectWithError);
};

export {
  fetchGoogleContent,
};
