import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export function  Welcome ({ authToken }) {
  const text = (authToken) ? (<div>Your auth token is <code>{authToken}</code>.</div>) : '';
  return (
  <div>
    <h2>Hei!</h2>
    {text}
    <Link to='/login'>Logg inn</Link>
  </div>
  );
}

export default connect(state => state)(Welcome);
