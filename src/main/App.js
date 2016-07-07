import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLocale } from '../locale/localeSelectors';
import Alerts from './Alerts';

export class App extends React.Component {
  getChildContext() {
    return {
      lang: this.props.locale,
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

App.propTypes = {
  locale: PropTypes.string.isRequired,
};

App.childContextTypes = {
  lang: PropTypes.string,
};

const mapStateToProps = (state) => Object.assign({}, state, { locale: getLocale(state) });

export default connect(mapStateToProps)(App);
