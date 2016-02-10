import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { initializeSession } from '../actions';

export class SessionInitializer extends React.Component {
  componentWillMount() {
    let { dispatch, params: { authToken } } = this.props;

    if (authToken) {
      dispatch( initializeSession(authToken) )
        .then(() => dispatch(routeActions.replace('/minside')) );
    }
  }

  render() {
    return <div></div>;
  }
}

SessionInitializer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({ authToken: PropTypes.string }).isRequired
};

export default connect(state => state)(SessionInitializer);
