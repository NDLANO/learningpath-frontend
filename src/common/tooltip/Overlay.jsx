import React, { Component, PropTypes, cloneElement } from 'react';
import Portal from './Portal';
import Position from './Position';
import { PLACEMENTS } from './constants';

class Overlay extends Component {

  render() {
    const { show, target, placement } = this.props;

    if (!show) {
      return null;
    }
    const children = cloneElement(this.props.children, { show });

    return (
      <Portal>
        <Position {...{ target, placement }}>
          {children}
        </Position>
      </Portal>
    );
  }
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  target: PropTypes.func.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS).isRequired,
};


export default Overlay;
