import React from 'react';

export default function LoginProviders() {
  return (
    <div>
      Logg inn i NDLA med
      <ul>
        <li><a href='/auth/google/login'>Google</a></li>
        <li><a href='/auth/facebook/login'>Facebook</a></li>
        <li><a href='/auth/twitter/login'>Twitter</a></li>
      </ul>
    </div>
  );
}
