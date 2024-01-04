/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import BaseOverlay from "react-overlays/lib/Overlay";
import { PLACEMENTS } from "./constants";

const Overlay = ({ children, ...props }) => {
  const child = cloneElement(children, {
    className: classNames(children.props.className, "in"),
  });

  return <BaseOverlay {...props}>{child}</BaseOverlay>;
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  target: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  placement: PropTypes.oneOf(PLACEMENTS).isRequired,
};

export default Overlay;
