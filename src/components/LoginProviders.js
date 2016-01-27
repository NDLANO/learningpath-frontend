import React from 'react';

export default function LoginProviders() {
  return (
    <div>
      Logg inn i NDLA med
      <ul>
        <li><a className='cta ctaGl' href='http://localhost:3000/auth/login/google?successUrl=/login/success/{appkey}&failureUrl=/login/failure'>Google</a></li>
        <li><a className='cta ctaFb' href='http://localhost:3000/auth/login/facebook?successUrl=/login/success/{appkey}&failureUrl=/login/failure'>Facebook</a></li>
        <li><a className='cta ctaTw' href='http://localhost:3000/auth/login/twitter?successUrl=/login/success/{appkey}&failureUrl=/login/failure'>Twitter</a></li>
      </ul>
    </div>
  );
}
