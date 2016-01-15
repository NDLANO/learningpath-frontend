import React from 'react';

export default function LoginProviders() {
  return (
    <div>
      Logg inn i NDLA med
      <ul>
        <li><a href='/auth/login/google?successUrl=/learningpath/login/success/{appkey}&failureUrl=/learningpath/login/failure'>Google</a></li>
        <li><a href='/auth/login/facebook?successUrl=/learningpath/login/success/{appkey}&failureUrl=/learningpath/login/failure'>Facebook</a></li>
        <li><a href='/auth/login/twitter?successUrl=/learningpath/login/success/{appkey}&failureUrl=/learningpath/login/failure'>Twitter</a></li>
      </ul>
    </div>
  );
}
