import React from 'react';

export default function LoginProviders() {
  return (
    <div>
      Logg inn i NDLA med
      <ul>
        <li><a className='cta ctaGl' href='/auth/login/google?successUrl=/login/success/{appkey}&failureUrl=/login/failure'>Google</a></li>
        <li><a className='cta ctaFb' href='/auth/login/facebook?successUrl=/login/success/{appkey}&failureUrl=/login/failure'>Facebook</a></li>
        <li><a className='cta ctaTw' href='/auth/login/twitter?successUrl=/login/success/{appkey}&failureUrl=/login/failure'>Twitter</a></li>
      </ul>
    </div>
  );
}
