import React from 'react';
import { connect } from 'react-redux';
import polyglot from '../i18n';

export default function requireAuthentication(Component) {

  function AuthenticatedComponent (props) {
    return props.authenticated ?  // eslint-disable-line react/prop-types
      (<Component {...props} />) :
      (<div>{polyglot.t('requireAuthentication.errorMessage')} </div>);
  }

  return connect(state => state)(AuthenticatedComponent);
}
