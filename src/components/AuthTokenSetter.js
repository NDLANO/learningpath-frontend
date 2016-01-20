import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { authenticationSuccess } from '../actions';

export class AuthTokenSetter extends React.Component {
  componentWillMount() {
    let { dispatch, params: { authToken } } = this.props;

    if (authToken) {
      dispatch( authenticationSuccess(authToken) )
        .then(() => dispatch(routeActions.replace('/minside')) );
    }
  }

  render() {
    return <div></div>;
  }
}

AuthTokenSetter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({ authToken: PropTypes.string }).isRequired
};

export default connect(state => state)(AuthTokenSetter);
