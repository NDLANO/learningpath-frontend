/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { getLocale } from '../locale/localeSelectors';
import { getMessages } from '../messages/messagesSelectors';
import Alerts from '../messages/Alerts';
import { checkAccessTokenOnEnter } from '../session/sessionActions';
import ScrollToTop from './ScrollToTop';
import Welcome from './Welcome';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import MyPage from '../myPage/MyPage';
import LTIEmbedded from '../ltiSearch/LTIEmbedded';
import LoginProviders from '../session/LoginProviders';
import LogoutSession from '../session/LogoutSession';
import LearningPathContainer from '../learningPath/LearningPathContainer';

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
    const { dispatch, messages } = this.props;
    return (
      <div>
        <div className="page-container">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/login" component={LoginProviders} />
            <Route path="/logout" component={LogoutSession} />
            <PrivateRoute path="/minside" component={MyPage} />
            <PrivateRoute path="/lti/:pathId/step/:stepId" component={LTIEmbedded} />
            <PrivateRoute path="/lti/:pathId/step/new" component={LTIEmbedded} />
            <Route path="/learningpaths" component={LearningPathContainer} />
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/notfound" component={NotFound} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Alerts dispatch={dispatch} messages={messages} />
        </div>
        <ScrollToTop />
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

export default withRouter(connect(mapStateToProps)(App));
