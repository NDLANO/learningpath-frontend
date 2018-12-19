/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { getLocale } from '../locale/localeSelectors';
import { getMessages } from '../messages/messagesSelectors';
import Alerts from '../messages/Alerts';
import ScrollToTop from './ScrollToTop';
import Welcome from './Welcome';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import MyPage from '../myPage/MyPage';
import Admin from '../admin/Admin';
import LTIEmbedded from '../ltiSearch/LTIEmbedded';
import LoginProviders from '../session/LoginProviders';
import LogoutSession from '../session/LogoutSession';
import LearningPathContainer from '../learningPath/LearningPathContainer';
import LoginFailure from '../session/LoginFailure';
import SessionInitializer from '../session/SessionInitializer';
import ZendeskButton from './ZendeskButton';
import ErrorPage from '../errorPage/ErrorPage';
import '../style/index.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  getChildContext() {
    return {
      lang: this.props.locale,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { dispatch, messages, locale } = this.props;
    if (this.state.hasError) {
      return <ErrorPage locale={locale} />;
    }
    return (
      <div>
        <div className="page-container">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={LoginProviders} />
            <Route exact path="/login/success" component={SessionInitializer} />
            <Route exact path="/login/failure" component={LoginFailure} />
            <Route path="/logout" component={LogoutSession} />
            <PrivateRoute path="/minside" component={MyPage} />
            <PrivateRoute
              path="/lti/:pathId/step/:stepId"
              component={LTIEmbedded}
            />
            <PrivateRoute
              path="/lti/:pathId/step/new"
              component={LTIEmbedded}
            />
            <Route path="/learningpaths" component={LearningPathContainer} />
            <AdminRoute path="/admin" component={Admin} />
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/notfound" component={NotFound} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Alerts dispatch={dispatch} messages={messages} />
        </div>
        <ScrollToTop />
        <ZendeskButton />
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
