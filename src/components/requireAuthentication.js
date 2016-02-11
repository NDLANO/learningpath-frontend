import React from 'react';
import { connect } from 'react-redux';

export default function requireAuthentication(Component) {

  function AuthenticatedComponent (props) {
    return props.authenticated ?
      (<Component {...props} />) :
      (<div>Authentication required</div>);
  }

  return connect(state => state)(AuthenticatedComponent);
}
