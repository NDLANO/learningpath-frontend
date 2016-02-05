import React from 'react';
import { apiResourceUrl, locationOrigin } from '../sources/helpers';

const query = '?successUrl=' + locationOrigin + '/login/success/{appkey}' +
              '&failureUrl=' + locationOrigin + '/login/failure';

export default function LoginProviders() {
  return (
    <div id='login'>
      <h3>Logg inn i NDLA med</h3>
      <ul>
        <li><a className='cta-link cta-link--gl' href={apiResourceUrl('/auth/login/google' + query)}>Google</a></li>
        <li><a className='cta-link cta-link--fb' href={apiResourceUrl('/auth/login/facebook' + query)}>Facebook</a></li>
        <li><a className='cta-link cta-link--tw' href={apiResourceUrl('/auth/login/twitter' + query)}>Twitter</a></li>
      </ul>
    </div>
  );
}
