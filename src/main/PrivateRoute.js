import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route
    {...rest} render={props => (
    authenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    ))}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(state => state)(PrivateRoute);
