/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from './sessionActions';
import polyglot from '../i18n';

export class LogoutSession extends React.Component {
  constructor() {
    super();
    this.state = {
      logoutClicked: false,
    };
  }

  handleLogoutClick = (federated = undefined) => {
    this.setState({ logoutClicked: true });
    this.props.localLogout(federated);
  };

  render() {
    const { authenticated } = this.props;
    if (!authenticated && !this.state.logoutClicked) {
      return <Redirect to="/forbidden" />;
    }

    return (
      <div className="one-column one-column--narrow logout-container one-column--text-centered">
        <Helmet title={polyglot.t('logoutSession.title')} />
        <button
          className="button--primary-outline cta-link--block"
          onClick={() => this.handleLogoutClick()}>
          {polyglot.t('logoutSession.logutLearningpathSite')}
        </button>
        <strong>{polyglot.t('logoutSession.or')}</strong>
        <button
          className="button--primary-outline cta-link--block"
          onClick={() => this.handleLogoutClick(true)}>
          {polyglot.t('logoutSession.logoutWholeSession')}
        </button>
      </div>
    );
  }
}

LogoutSession.propTypes = {
  localLogout: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  localLogout: actions.logoutPersonalAuth,
};

export default connect(state => state, mapDispatchToProps)(LogoutSession);
