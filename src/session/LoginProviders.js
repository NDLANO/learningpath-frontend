/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import { HelmetWithTracker } from 'ndla-tracker';
import polyglot from '../i18n';
import { loginPersonalAuth } from './sessionActions';
import config from '../config';

const LoginProviders = () => {
  if (config.isProduction) {
    return <Redirect to="/notfound" />;
  }
  return (
    <div className="one-column one-column--narrow">
      <HelmetWithTracker title={polyglot.t('htmlTitles.loginProviders')} />
      <h3>{polyglot.t('loginProviders.description')}</h3>
      <ul className="vertical-menu">
        <li className="vertical-menu_item">
          <button
            type="button"
            onClick={() => loginPersonalAuth('google-oauth2')}
            className="un-button cta-link cta-link--block cta-link--gl"
            data-cy="login-google-button">
            Google
          </button>
        </li>
        <li className="vertical-menu_item">
          <button
            type="button"
            onClick={() => loginPersonalAuth('facebook')}
            className="un-button cta-link cta-link--block cta-link--fb">
            Facebook
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LoginProviders;
