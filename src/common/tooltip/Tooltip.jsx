/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const RIGHT = 'right';
export const LEFT = 'left';
export const TOP = 'top';
export const BOTTOM = 'bottom';

export const PLACEMENTS = [LEFT, RIGHT, TOP, BOTTOM];

const Tooltip = props => {
  const { placement, className, children, show } = props;

  const classes = {
    [`tooltip--${placement}`]: true,
    in: show,
  };
  const positionStyle = {
    left: props.positionLeft,
    top: props.positionTop,
  };
  return (
    <div
      style={positionStyle}
      className={classNames('tooltip', className, classes)}
      role="tooltip">
      <div className="tooltip_arrow" />
      <div className="tooltip_content">{children}</div>
    </div>
  );
};

Tooltip.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Accessibility
  placement: PropTypes.oneOf(PLACEMENTS).isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  positionTop: PropTypes.number,
  positionLeft: PropTypes.number,
};

Tooltip.defaultProps = {
  placement: RIGHT,
  show: false,
};

export default Tooltip;
