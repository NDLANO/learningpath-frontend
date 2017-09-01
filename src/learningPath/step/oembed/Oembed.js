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
import get from 'lodash/get';
import Spinner from '../../../common/Spinner';

export const urlIsNDLA = url => (/^(http|https):\/\/ndla.no/).test(url);
export const urlIsApiNDLA = url => (/^(http|https):\/\/ndla-frontend.(test.|staging.)?api.ndla.no/).test(url);
export const urlIsLocalNdla = url => (/^http:\/\/proxy.ndla-local:30017/).test(url);


export default class Oembed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNDLAResource: false,
      listeningToResize: false,
      isLoadingResource: true,
    };

    this.handleResizeMessage = this.handleResizeMessage.bind(this);
  }

  componentWillMount() {
    this.handleIframeResizing(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleIframeResizing(props);
  }

  componentWillUnmount() {
    this.disableIframeResizing();
    this.setState({ isLoadingResource: false });
  }

  getIframeDOM() {
    return this.iframeDiv.children[0];
  }

  handleIframeResizing({ oembedContent: { url } }) {
    if (urlIsNDLA(url) || urlIsApiNDLA(url) || urlIsLocalNdla(url)) {
      this.setState({ isNDLAResource: true }, this.enableIframeResizing);
    } else {
      this.setState({ isNDLAResource: false }, this.disableIframeResizing);
    }
  }

  enableIframeResizing() {
    if (!this.state.listeningToResize) {
      window.addEventListener('message', this.handleResizeMessage);
      this.setState({ listeningToResize: true });
    }
  }

  disableIframeResizing() {
    window.removeEventListener('message', this.handleResizeMessage);
    this.setState({ listeningToResize: false });
    this.setState({ isLoadingResource: false });
  }

  handleResizeMessage(evt) {
    if (!this.state.listeningToResize || !evt.data.height) {
      return;
    }

    const iframe = this.getIframeDOM();

    if (iframe.contentWindow !== get(evt, 'source')) {
      return;
    }

    /* Needed to enforce content to stay within iframe on Safari iOS */
    iframe.setAttribute('scrolling', 'no');

    const newHeight = parseInt(get(evt, 'data.height', 0), 10) + 55;

    iframe.style.height = `${newHeight}px`;
    this.setState({ isLoadingResource: false });
  }

  render() {
    const { oembedContent: { html, embedType } } = this.props;

    return (
      <div>
        {this.state.isLoadingResource && <Spinner hasMargins />}
        <div
          className={classNames({
            'learning-step': true,
            'learning-step_embed': true,
            'learning-step--without-dimensions': this.state.isNDLAResource,
            'learning-step_lti': embedType === 'lti',
            'learning-step_oembed': embedType === 'oembed',
          })}
          dangerouslySetInnerHTML={{ __html: html }}
          ref={(iframeDiv) => { this.iframeDiv = iframeDiv; }}
        />
      </div>
    );
  }
}

Oembed.propTypes = {
  oembedContent: PropTypes.object.isRequired,
  embedType: PropTypes.string,
};

Oembed.defaultProps = {
  oembedContent: {},
};
