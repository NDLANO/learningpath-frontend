import React from 'react';
import { connect } from 'react-redux';
import Masthead from './Masthead';

export function App({children}) {
  return (
    <div>
      <Masthead />
      <content>
        {children}
      </content>
    </div>
  );
}

export default connect(state => state)(App);
