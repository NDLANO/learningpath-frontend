import React from 'react';
import { connect } from 'react-redux';
import { replacePath } from 'redux-simple-router';
import { authenticationSuccess } from '../actions';

export class AuthTokenSetter extends React.Component {
  componentWillMount() {
    let { dispatch, params: { authToken } } = this.props;

    if (authToken) {
      dispatch( authenticationSuccess(authToken) )
        .then(() => dispatch(replacePath('/')) );
    }
  }

  render() {
    return <div></div>;
  }
}


export default connect(state => state)(AuthTokenSetter);
