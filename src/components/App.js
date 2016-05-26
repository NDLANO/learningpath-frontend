import React from 'react';
import { connect } from 'react-redux';


import Masthead from './Masthead';
import Alerts from './Alerts';

export class App extends React.Component {
  getChildContext() {
    return {
      lang: 'nb'
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
        <Alerts />
      </div>
    );
  }
}

App.childContextTypes = {
  lang: React.PropTypes.string
};

export default connect(state => state)(App);
