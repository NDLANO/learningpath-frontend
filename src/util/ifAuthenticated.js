export default function ifAuthenticated(authenticated, cb) {
  console.log(authenticated);
  return (...args) => {
    if (authenticated) {
      return cb ? cb(...args) : undefined;
    }
    return undefined;
  };
}
