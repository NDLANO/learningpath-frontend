/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { closeSidebars } from "./sidebarActions";

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

  return connect((state) => state, mapDispatchToProps)(CloseSidebarsOnClickComponent);
}
