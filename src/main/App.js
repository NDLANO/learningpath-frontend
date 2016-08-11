/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
      <div className="page-container">
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
