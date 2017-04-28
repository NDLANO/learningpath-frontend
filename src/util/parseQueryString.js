import 'url-search-params-polyfill';

export default function parseQueryString(query) {
  const entries = Array.from(new URLSearchParams(query));
  return entries.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
}
