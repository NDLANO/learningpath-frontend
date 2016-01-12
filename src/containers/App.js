import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export function App({children}) {
  return (
    <div>
      <h1>
        NDLA <small><Link to='/'>Læringsstier</Link></small>
      </h1>
      <div>
        {children}
      </div>
    </div>
  );
}

export default connect(state => state)(App);
