import React from 'react';
import { connect } from 'react-redux';

import Logo from './Logo';
import SiteNav from './SiteNav';
import Alerts from './Alerts';

export function App({children}) {
  return (
    <div>
      <div className='masthead'>
        <div className='masthead_left'>
          <Logo />
        </div>
        <div className='masthead_right'>
          <SiteNav />
        </div>
      </div>
      <div className='content'>
        {children}
      </div>

      <Alerts />
    </div>
  );
}

export default connect(state => state)(App);
