const TOKEN_KEY = 'ndla:sti:token';

export function storeToken (token) {
  localStorage.setItem(TOKEN_KEY, token);
  return Promise.resolve(token);
}

export function getToken () {
  return Promise.resolve(localStorage.getItem(TOKEN_KEY));
}

export function getTokenSync () {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken () {
  localStorage.removeItem(TOKEN_KEY);
  return Promise.resolve(true);
}

export default { storeToken, getToken, getTokenSync, removeToken };
