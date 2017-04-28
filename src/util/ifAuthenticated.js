export default function ifAuthenticated(authenticated, cb) {
  return (...args) => {
    if (authenticated) {
      return cb ? cb(...args) : undefined;
    }
    return undefined;
  };
}
