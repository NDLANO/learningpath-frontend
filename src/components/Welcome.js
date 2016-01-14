import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export function  Welcome ({ authToken, userName }) {
  const text = (authToken) ? (<div>Your auth token is <code>{authToken}</code>.</div>) : '';
  return (
  <div>
    <h2>Hei {userName}</h2>
    {text}
    <Link to='/login'>Logg inn</Link>
  </div>
  );
}

const selectUserName = (user) => (user) ? [user.first_name, user.middle_name, user.last_name].join(' ') : '';

const select = (state) => ({
  authToken: state.authToken,
  userName: selectUserName(state.user)
});

export default connect(select)(Welcome);
