import decode from 'jwt-decode';

export function getTokenExpiration(token) {
  const decoded = decode(token);
  return decoded.exp;
}
export function getTokenIssuedAt(token) {
  const decoded = decode(token);
  return decoded.iat;
}

export function getIdTokenExpireEpoch(token) {
  const decodedIdToken = decode(token);
  return (((decodedIdToken.exp - decodedIdToken.iat) * 1000) + new Date().getTime()) - (60 * 1000);
}

export function getAccessTokenExpireEpoch(token) {
  const decodedAccessToken = decode(token);
  return (((decodedAccessToken.exp - decodedAccessToken.iat) * 1000) + new Date().getTime()) - (60 * 1000);
}

export const decodeToken = idToken => decode(idToken);
