import decode from 'jwt-decode';

export function getTokenExpireAt(token) {
  const decoded = decode(token);
  return (((decoded.exp - decoded.iat) * 1000) + new Date().getTime()) - (60 * 1000);
}

export const decodeToken = idToken => decode(idToken);
