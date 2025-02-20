import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { LocationShape } from "../shapes";
import { loginPersonalAuth } from "../session/sessionActions";

const PrivateRoute = ({ authenticated, location, component: Component, ...rest }) => {
  if (!authenticated) {
    loginPersonalAuth(location.pathname);
  }
  return <Route {...rest} render={(props) => (authenticated ? <Component {...props} /> : null)} />;
};

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: LocationShape.isRequired,
};

export default connect((state) => state)(PrivateRoute);
