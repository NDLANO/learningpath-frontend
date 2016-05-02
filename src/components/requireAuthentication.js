import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import polyglot from '../i18n';

import LoginProviders from './LoginProviders';

export default function requireAuthentication(Component) {

  function AuthenticatedComponent (props) {
    return props.authenticated ?
      <Component {...props} /> :
      <LoginProviders message={polyglot.t('requireAuthentication.errorMessage')} />;
  }
  
  AuthenticatedComponent.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  return connect(state => state)(AuthenticatedComponent);
}
