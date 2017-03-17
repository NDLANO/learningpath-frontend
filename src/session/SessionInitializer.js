/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { initializeSession } from './sessionActions';


export class SessionInitializer extends React.Component {
  componentWillMount() {
    const { dispatch, stateUuid, params: { accessToken } } = this.props;

    const getHashValue = (key) => {
      const matches = this.props.location.hash.match(new RegExp(`${key}=([^&]*)`));
      return matches ? matches[1] : null;
    };

    console.log(getHashValue('state'));
    console.log(this.props);
    if (getHashValue('id_token') && getHashValue('state') === stateUuid) {
      dispatch(initializeSession(accessToken))
        .then(() => dispatch(routerActions.replace('/minside')));
    }
  }

  render() {
    return <div />;
  }
}

SessionInitializer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({ accessToken: PropTypes.string }).isRequired,
};

export default connect(state => state)(SessionInitializer);
