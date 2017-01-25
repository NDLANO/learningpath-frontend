/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import createChainedFunction from 'react-overlays/lib/utils/createChainedFunction';
import Overlay from './Overlay';
import { PLACEMENTS } from './constants';

class OverlayTrigger extends Component {

  constructor(args) {
    super(args);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
      isOverlayShown: false,
    };
  }

  componentDidMount() {
    this.mountNode = document.createElement('div');
    this.renderOverlay();
  }

  componentDidUpdate() {
    if (this.mountNode) {
      this.renderOverlay();
    }
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.mountNode);
    this.mountNode = null;
  }

  getOverlay() {
    const props = {
      placement: this.props.placement,
      show: this.state.isOverlayShown,
      target: this,
    };

    const overlay = cloneElement(this.props.overlay, {
      placement: this.props.placement,
    });

    return (
      <Overlay {...props}>
        {overlay}
      </Overlay>
    );
  }

  handleShow() {
    this.setState({
      isOverlayShown: true,
    });
  }

  handleHide() {
    this.setState({
      isOverlayShown: false,
    });
  }

  renderOverlay() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, this.overlay, this.mountNode
    );
  }

  // TODO: Currently we ignore the trigger prop
  // Meaning we dont support 'click'
  // Doesn't really matter atm, as hover and fo

  render() {
    const trigger = React.Children.only(this.props.children);
    const triggerProps = trigger.props;

    // create in render otherwise owner is lost...
    this.overlay = this.getOverlay();

    const props = {
      onMouseOver: createChainedFunction(this.handleShow, triggerProps.onMouseOver),
      onMouseOut: createChainedFunction(this.handleHide, triggerProps.onMouseOut),
      onFocus: createChainedFunction(this.handleShow, triggerProps.onFocus),
      onBlur: createChainedFunction(this.handleHide, triggerProps.onBlur),
      'aria-describedby': this.props.overlay.props.id,
    };

    return cloneElement(trigger, props);
  }
}

OverlayTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  overlay: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS),
  trigger: PropTypes.oneOfType([
    PropTypes.oneOf(['click', 'hover', 'focus']),
    PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus'])),
  ]),
};

// hover only doesn't play well with touch and keyboard only users.
// So always use hover and focus together!
OverlayTrigger.defaultProps = {
  trigger: ['hover', 'focus'],
};

export default OverlayTrigger;
