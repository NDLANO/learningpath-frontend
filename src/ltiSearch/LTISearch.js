/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import LTISubmitForm from './LTISubmitForm';
import LTISearchFilter from './LTISearchFilter';
import Lightbox from '../common/Lightbox';

class LTISearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ltiDisplay: false,
    };
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.toggleLTISearch = this.toggleLTISearch.bind(this);
    this.ltiSearchClose = this.ltiSearchClose.bind(this);
  }
  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
  }

  handlePostMessage(evt) {
    if (!evt.data || evt.data.type !== 'ltiParams') {
      return;
    }
    this.props.embedTypeOnBlur('lti');
    if (evt.data.params.url) {
      this.props.urlOnBlur(decodeURIComponent(evt.data.params.url));
    }
    this.setState({ ltiDisplay: false });
  }

  toggleLTISearch(evt) {
    evt.preventDefault();
    this.setState({ ltiDisplay: true });
  }

  ltiSearchClose() {
    this.setState({ ltiDisplay: false });
  }
  render() {
    const { stepId, learningPathId } = this.props;

    const onFilterClick = (filter = undefined) => {
      if (filter) {
        const frameDiv = document.getElementById('ltiiframewrapper');
        const iframe = frameDiv.getElementsByTagName('iframe')[0];
        const frame = document.createElement('iframe');
        frame.id = 'ltiiframe';
        frameDiv.replaceChild(frame, iframe);
        const newIframe = frameDiv.getElementsByTagName('iframe')[0].contentWindow.document;
        const body = newIframe.getElementsByTagName('body')[0];
        const form = ReactDOMServer.renderToString(<LTISubmitForm filter={filter} />);
        body.innerHTML = form;
        newIframe.getElementById('ltiform').submit();
      }
    };

    return (
      <div>
        <button className="button button--primary button--block embed-search_open-button" onClick={this.toggleLTISearch}>Søk i LTI</button>
        <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll">
          <Lightbox display={this.state.ltiDisplay} onClose={this.ltiSearchClose}>
            <LTISearchFilter onFilterClick={onFilterClick} stepId={stepId} learningPathId={learningPathId} />
            <div id="ltiiframewrapper" className="lti-iframe_wrapper">
              <iframe id="ltiiframe" />
            </div>
          </Lightbox>
        </div>
      </div>
    );
  }
}


LTISearch.propTypes = {
  stepId: PropTypes.number,
  learningPathId: PropTypes.number.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
  embedTypeOnBlur: PropTypes.func.isRequired,
};

LTISearch.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export default LTISearch;
