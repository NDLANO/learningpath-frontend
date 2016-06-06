import React, { PropTypes } from 'react';
import classNames from 'classnames';

export const RIGHT = 'right';
export const LEFT = 'left';
export const TOP = 'top';
export const BOTTOM = 'bottom';

export const PLACEMENTS = [
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
];

const Tooltip = (props) => {
  const { placement, className, children, show } = props;

  const classes = {
    [`tooltip--${placement}`]: true,
    in: show,
  };

  return (
    <div {...props} className={classNames('tooltip', className, classes)} role="tooltip">
      <div className="tooltip_arrow" />
      <div className="tooltip_content">
        {children}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired, // Accessibility
  placement: PropTypes.oneOf(PLACEMENTS).isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
};

Tooltip.defaultProps = {
  placement: RIGHT,
  show: false,
};

export default Tooltip;
