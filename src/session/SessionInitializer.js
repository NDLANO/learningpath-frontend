import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { initializeSession } from '../actions';

export class SessionInitializer extends React.Component {
  componentWillMount() {
    const { dispatch, params: { authToken } } = this.props;

    if (authToken) {
      dispatch(initializeSession(authToken))
        .then(() => dispatch(routerActions.replace('/minside')));
    }
  }

  render() {
    return <div />;
  }
}

SessionInitializer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({ authToken: PropTypes.string }).isRequired,
};

export default connect(state => state)(SessionInitializer);
