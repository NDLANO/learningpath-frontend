/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import polyglot from '../i18n';
import LabeledIcon from '../common/LabeledIcon';

export default function LoginFailure() {
  return (
    <div className="one-column one-column--narrow one-column--text-centered">
      <Helmet title={polyglot.t('loginFailure.title')} />
      <p>{polyglot.t('loginFailure.errorMessage')}</p>
      <Link className="cta-link--primary cta-link--underline" to="/login">
        <LabeledIcon.Exit labelText={polyglot.t('loginFailure.loginLink')} />
      </Link>
    </div>
  );
}
