/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { changeIframeContent } from './ltiSearchActions';

class LTISearch extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostMessage = this.handlePostMessage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
    changeIframeContent(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter && nextProps.filter.type === 'lti') {
      changeIframeContent(nextProps.filter);
    }
  }

  handlePostMessage(evt) {
    if (!evt.data || evt.data.type !== 'ltiParams') {
      return;
    }
    this.props.embedTypeOnBlur('lti');
    if (evt.data.params.url) {
      this.props.urlOnBlur(decodeURIComponent(evt.data.params.url));
    }
    this.props.closeExternalSearch();
  }

  render() {
    return (
      <div id="ltiiframewrapper" className="lti-iframe_wrapper">
        <iframe id="ltiiframe" />
      </div>
    );
  }
}

LTISearch.propTypes = {
  filter: PropTypes.object.isRequired,
  embedTypeOnBlur: PropTypes.func.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
  closeExternalSearch: PropTypes.func.isRequired,
};

LTISearch.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export default LTISearch;
