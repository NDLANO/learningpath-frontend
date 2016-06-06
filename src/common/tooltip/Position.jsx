import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import calcOverlayPosition from './utils/overlayPositionUtils';
import { PLACEMENTS } from './Tooltip';

class Position extends Component {

  constructor(args) {
    super(args);
    this.state = {
      positionLeft: 0,
      positionTop: 0,
    };
    this.lastTarget = null;
    this.needsFlush = false;
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentWillReceiveProps() {
    this.needsFlush = true;
  }

  componentDidUpdate() {
    if (this.needsFlush) {
      this.needsFlush = false;
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    this.lastTarget = null;
  }

  getTarget() {
    if (!this.props.target) {
      return null;
    }

    return this.props.target();
  }

  updatePosition() {
    const target = this.getTarget();

    if (target === this.lastTarget) {
      return;
    }

    this.lastTarget = target;

    if (!target) {
      this.setState({
        positionLeft: 0,
        positionTop: 0,
      });

      return;
    }

    const overlay = ReactDOM.findDOMNode(this);

    this.setState(calcOverlayPosition(
        this.props.placement,
        overlay,
        target
    ));
  }

  render() {
    const child = React.Children.only(this.props.children);

    return cloneElement(
      child,
      {
        style: {
          left: this.state.positionLeft,
          top: this.state.positionTop,
        },
      }
    );
  }
}

Position.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.func.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS).isRequired,
};

export default Position;
