/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';
import polyglot from '../i18n';
import { loginSocialMedia } from './sessionActions';
import LoginFailure from './LoginFailure';
import SessionInitializer from './SessionInitializer';

const LoginProviders = (props) => {
  const { message, match } = props;
  let messageEl;
  if (message) {
    messageEl = <p>{message}</p>;
  }


  return (
    <div className="one-column one-column--narrow">
      <Route path={`${match.url}/success`} component={SessionInitializer} />
      <Route path={`${match.url}/failure(/)`} component={LoginFailure} />
      <h3>{polyglot.t('loginProviders.description')}</h3>
      {messageEl}
      <ul className="vertical-menu">
        <li className="vertical-menu_item"><button onClick={() => loginSocialMedia('google-oauth2')} className="un-button cta-link cta-link--block cta-link--gl">Google</button></li>
        <li className="vertical-menu_item"><button onClick={() => loginSocialMedia('facebook')} className="un-button cta-link cta-link--block cta-link--fb">Facebook</button></li>
        <li className="vertical-menu_item"><button onClick={() => loginSocialMedia('twitter')} className="un-button cta-link cta-link--block cta-link--tw">Twitter</button></li>
      </ul>
    </div>
  );
};

LoginProviders.propTypes = {
  message: PropTypes.string,
  match: PropTypes.object.isRequired,
};

export default LoginProviders;
