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
