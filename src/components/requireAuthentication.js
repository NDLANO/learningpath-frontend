import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import polyglot from '../i18n';

export default function requireAuthentication(Component) {

  function AuthenticatedComponent (props) {
    return props.authenticated ?
      (<Component {...props} />) :
      (<div>{polyglot.t('requireAuthentication.errorMessage')}</div>);
  }
  
  AuthenticatedComponent.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  return connect(state => state)(AuthenticatedComponent);
}
