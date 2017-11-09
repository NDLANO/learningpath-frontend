import decode from 'jwt-decode';

export function getIdTokenExpireEpoch(token) {
  const decodedIdToken = decode(token);
  return (((decodedIdToken.exp - decodedIdToken.iat) * 1000) + new Date().getTime()) - (60 * 1000);
}

export function getAccessTokenExpireEpoch(token) {
  const decodedAccessToken = decode(token);
  return (((decodedAccessToken.exp - decodedAccessToken.iat) * 1000) + new Date().getTime()) - (60 * 1000);
}

export const decodeToken = idToken => decode(idToken);
