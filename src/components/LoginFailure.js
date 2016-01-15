import React from 'react';
import { Link } from 'react-router';

export default function LoginFailure () {
  return (
    <div>Sorry, login failed.  <Link to='/login'>Logg inn</Link>.</div>
  );
}
