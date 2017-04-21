export default function formatUrl(url, params) {
  const formattedUrl = url.split('/').map(param => params[param.replace(':', '')] || param);
  return formattedUrl.join('/');
}
