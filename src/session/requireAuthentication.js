/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import polyglot from '../i18n';

import LoginProviders from './LoginProviders';

export default function requireAuthentication(Component) {
  function AuthenticatedComponent(props) {
    return props.authenticated ?
      <Component {...props} /> :
      <LoginProviders message={polyglot.t('requireAuthentication.errorMessage')} />;
  }

  AuthenticatedComponent.propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };

  return connect(state => state)(AuthenticatedComponent);
}
