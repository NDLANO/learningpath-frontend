import decode from 'jwt-decode';

export function getTokenExpiration(token) {
  const decoded = decode(token);
  return decoded.exp;
}
export function getTokenIssuedAt(token) {
  const decoded = decode(token);
  return decoded.iat;
}

export const decodeToken = idToken => decode(idToken);

export function getTimeToUpdateInMs(token) {
  return (getTokenExpiration(token) - getTokenIssuedAt(token) - (60 * 3)) * 1000; // Removes 3 minutes from time to update
}
