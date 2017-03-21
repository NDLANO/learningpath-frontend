/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import polyglot from '../i18n';
import { loginSocialMedia } from './sessionActions';

const LoginProviders = (props) => {
  const { message } = props;
  let messageEl;
  if (message) {
    messageEl = <p>{message}</p>;
  }


  return (
    <div className="one-column one-column--narrow">
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
};

export default LoginProviders;
