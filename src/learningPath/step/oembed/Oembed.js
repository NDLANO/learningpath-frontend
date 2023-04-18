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

export const urlIsNDLAApiUrl = url =>
  /^(http|https):\/\/(ndla-frontend|www).([a-zA-Z]+.)?api.ndla.no/.test(url);
export const urlIsNDLAEnvUrl = url =>
  /^(http|https):\/\/(www.)?([a-zA-Z]+.)?ndla.no/.test(url);
export const urlIsLocalNdla = url =>
  /^http:\/\/(proxy.ndla-local|localhost):30017/.test(url);
export const urlIsNDLAUrl = url =>
  urlIsNDLAApiUrl(url) || urlIsNDLAEnvUrl(url) || urlIsLocalNdla(url);

export default class Oembed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNDLAResource: false,
    };
  }

  componentDidMount() {
    this.handleIframeResizing(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.oembedContent.url !== prevProps.oembedContent.url) {
      this.handleIframeResizing(this.props);
    }
  }

  handleIframeResizing({ oembedContent: { url } }) {
    if (urlIsNDLAUrl(url)) {
      this.setState({ isNDLAResource: true });
    } else {
      this.setState({ isNDLAResource: false });
    }
  }

  render() {
    const {
      oembedContent: { html, embedType },
    } = this.props;

    return (
      <div>
        <div
          className={classNames({
            'learning-step': true,
            'learning-step_embed': true,
            'learning-step--without-dimensions': this.state.isNDLAResource,
            'learning-step_lti': embedType === 'lti',
            'learning-step_oembed':
              embedType === 'oembed' || embedType === 'iframe',
          })}
          dangerouslySetInnerHTML={{ __html: html }}
          ref={iframeDiv => {
            this.iframeDiv = iframeDiv;
          }}
        />
      </div>
    );
  }
}

Oembed.propTypes = {
  oembedContent: PropTypes.object,
  embedType: PropTypes.string,
};

Oembed.defaultProps = {
  oembedContent: {},
};
