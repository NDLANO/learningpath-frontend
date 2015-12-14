import React from 'react';

export default class LoginProviders extends React.Component {
  render () {
    return (
        <div>
          Logg inn i NDLA med
          <a href='/login/facebook'>Google</a>
          <a href='/login/google'>Facebook</a>
        </div>
    );
  }
}
