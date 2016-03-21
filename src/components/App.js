import React from 'react';
import { connect } from 'react-redux';

import Logo from './Logo';
import SiteNav from './SiteNav';

export class App extends React.Component {
  getChildContext () {
    return {
      lang: 'nb'
    };
  }

  render() {
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
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  lang: React.PropTypes.string
};

export default connect(state => state)(App);
