import React from 'react';
import { connect } from 'react-redux';

export default function requireAuthentication(Component) {

  function AuthenticatedComponent (props) {
    return (
      <div>
        {props.authenticated ? <Component {...props} /> : 'Auth required'}
      </div>
    );
  }

  return connect(state => state)(AuthenticatedComponent);
}
