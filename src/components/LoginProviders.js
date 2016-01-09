import React from 'react';

export default class LoginProviders extends React.Component {
  render () {
    return (
        <div>
          Logg inn i NDLA med
          <a href='/auth/google/login'>Google</a>
          <a href='/auth/facebook/login'>Facebook</a>
          <a href='/auth/twitter/login'>Twitter</a>
        </div>
    );
  }
}
