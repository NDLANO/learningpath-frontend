import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  closeSidebars,
} from '../actions';

export default function withCloseSidebars(Component) {
  function CloseSidebarsOnClickComponent({ localCloseSidebars, ...rest }) {
    return <Component {...rest} closeSidebars={localCloseSidebars} />;
  }

  CloseSidebarsOnClickComponent.propTypes = {
    localCloseSidebars: PropTypes.func.isRequired,
  };
  const mapDispatchToProps = {
    localCloseSidebars: closeSidebars,
  };

  return connect(state => state, mapDispatchToProps)(CloseSidebarsOnClickComponent);
}
