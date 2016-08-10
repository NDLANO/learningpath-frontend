/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Link } from 'react-router';
import polyglot from '../i18n';

export default function LoginFailure() {
  return (
    <div>
      {polyglot.t('loginFailure.errorMessage')} <br /><br /> <Link to="/login">{polyglot.t('loginFailure.loginLink')}</Link>.
    </div>
  );
}
