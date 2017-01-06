/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import LTISearchFilter from './LTISearchFilter';
import Lightbox from '../common/Lightbox';
import { onFilterClick } from './ltiSearchActions';

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
