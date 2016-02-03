import React from 'react';
import { expandPath, locationOrigin } from '../sources/helpers';

const query = '?successUrl=' + locationOrigin + '/login/success/{appkey}' +
              '&failureUrl=' + locationOrigin + '/login/failure';

export default function LoginProviders() {
  return (
    <div id='login'>
      <h3>Logg inn i NDLA med</h3>
      <ul>
        <li><a className='cta ctaGl' href={expandPath('/auth/login/google' + query)}>Google</a></li>
        <li><a className='cta ctaFb' href={expandPath('/auth/login/facebook' + query)}>Facebook</a></li>
        <li><a className='cta ctaTw' href={expandPath('/auth/login/twitter' + query)}>Twitter</a></li>
      </ul>
    </div>
  );
}
