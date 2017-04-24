/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getLocale } from '../locale/localeSelectors';
import { getMessages } from '../messages/messagesSelectors';
import Alerts from '../messages/Alerts';
import { checkAccessTokenOnEnter } from '../session/sessionActions';
import ScrollToTop from './ScrollToTop';
import Welcome from './Welcome';

export class App extends React.Component {
  getChildContext() {
    return {
      lang: this.props.locale,
    };
  }
  componentWillMount() {
    this.props.dispatch(checkAccessTokenOnEnter());
  }

  render() {
    const { dispatch, children, messages } = this.props;

    console.log(this.props);
    return (
      <div>
        <div className="page-container">
          {children}
          <Alerts dispatch={dispatch} messages={messages} />
        </div>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Welcome} />
        </Switch>
      </div>

    );
  }
}

App.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

App.childContextTypes = {
  lang: PropTypes.string,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
  messages: getMessages(state),
});

export default connect(mapStateToProps)(App);
