function formatUrl(url, params) {
  return url.split('/').map(param => params[param.replace(':', '')] || param).join('/');
}

export default formatUrl;
