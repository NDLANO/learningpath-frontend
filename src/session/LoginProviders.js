/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import polyglot from '../i18n';
import { loginSocialMedia } from './sessionActions';

const LoginProviders = ({ message }) => (
  <div className="one-column one-column--narrow">
    <h3>{polyglot.t('loginProviders.description')}</h3>
    {message ? <p>{message}</p> : null}
    <ul className="vertical-menu">
      <li className="vertical-menu_item"><button onClick={() => loginSocialMedia('google-oauth2')} className="un-button cta-link cta-link--block cta-link--gl">Google</button></li>
      <li className="vertical-menu_item"><button onClick={() => loginSocialMedia('facebook')} className="un-button cta-link cta-link--block cta-link--fb">Facebook</button></li>
    </ul>
  </div>
  );

LoginProviders.propTypes = {
  message: PropTypes.string,
};

export default LoginProviders;
