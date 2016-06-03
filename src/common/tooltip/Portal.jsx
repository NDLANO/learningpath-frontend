import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {

  componentDidMount() {
    this.renderOverlay();
  }

  componentDidUpdate() {
    this.renderOverlay();
  }

  componentWillUnmount() {
    this.unrenderOverlay();
    this.unmountOverlayTarget();
  }

  mountOverlayTarget() {
    if (!this.overlayTarget) {
      this.overlayTarget = document.createElement('div');
      this.portalContainerNode = document.body;
      this.portalContainerNode.appendChild(this.overlayTarget);
    }
  }

  unrenderOverlay() {
    if (this.overlayTarget) {
      ReactDOM.unmountComponentAtNode(this.overlayTarget);
      this.overlayInstance = null;
    }
  }

  unmountOverlayTarget() {
    if (this.overlayTarget) {
      this.portalContainerNode.removeChild(this.overlayTarget);
      this.overlayTarget = null;
    }
    this.portalContainerNode = null;
  }

  renderOverlay() {
    const { children } = this.props;

    const overlay = !children ? null : React.Children.only(children);

    // Save reference for future access.
    if (overlay !== null) {
      this.mountOverlayTarget();
      this.overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
          this, overlay, this.overlayTarget
      );
    } else {
      // Unrender if the component is null for transitions to null
      this.unrenderOverlay();
      this.unmountOverlayTarget();
    }
  }

  render() {
    return null;
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Portal;
