import React from 'react';

export default function LoginProviders() {
  return (
    <div>
      Logg inn i NDLA med
      <ul>
        <li><a href='/auth/login/google'>Google</a></li>
        <li><a href='/auth/login/facebook'>Facebook</a></li>
        <li><a href='/auth/login/twitter'>Twitter</a></li>
      </ul>
    </div>
  );
}
