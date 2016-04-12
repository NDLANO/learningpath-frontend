import React from 'react';
import { Link } from 'react-router';
import polyglot from '../i18n';

export default function LoginFailure () {
  return (
    <div>{polyglot.t('loginFailure.errormessage')} <br/><br/>  <Link to='/login'>{polyglot.t('loginFailure.login')}</Link>.</div>
  );
}
