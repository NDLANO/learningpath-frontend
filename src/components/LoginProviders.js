import React from 'react';
import { expandPath } from '../sources/helpers';

let baseReturnUrl = 'http://api.test.ndla.no:8080';

/* #if development */
baseReturnUrl = 'http://localhost:3000';
/* #end */

const query = '?successUrl=' + baseReturnUrl + '/login/success/{appkey}' +
              '&failureUrl=' + baseReturnUrl + '/login/failure';

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
