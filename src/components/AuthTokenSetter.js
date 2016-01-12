import React from 'react';
import { connect } from 'react-redux';
import { setAuthToken } from '../actions';

export class AuthTokenSetter extends React.Component {
  componentWillMount() {
    let { dispatch, params: { authToken } } = this.props;

    if (authToken) {
      dispatch( setAuthToken(authToken) );
    }
  }

  render() {
    return <div></div>;
  }
}


export default connect(state => state)(AuthTokenSetter);
