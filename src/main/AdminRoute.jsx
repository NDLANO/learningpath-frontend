import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getScope } from '../util/jwtHelper';
import config from '../config';

const AdminRoute = ({
  authenticated,
  isAdmin,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated && isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/forbidden',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state =>
  Object.assign({}, state, {
    isAdmin: state.authenticated
      ? getScope(state.accessToken.token).includes(
          `learningpath-${config.environment}:publish`,
        )
      : false,
  });

export default connect(mapStateToProps)(AdminRoute);
