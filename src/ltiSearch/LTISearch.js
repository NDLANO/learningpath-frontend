/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOMServer from 'react-dom/server';
import LTISubmitForm from './LTISubmitForm';
import LTISearchFilter from './LTISearchFilter';

class LTISearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      iframeParams: undefined,
    };
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.toggleGoogleCustomSearch = this.toggleGoogleCustomSearch.bind(this);
  }
  componentDidMount() {
    if (window.location.search) {
      const params = window.location.search.substr(1).split('&').map(param => param.split('=')).reduce((obj, cur) => {
        const newObj = obj;
        newObj[cur[0]] = cur[1];
        return newObj;
      }, {});
      const obj = { params, type: 'ltiParams' };
      parent.postMessage(obj, window.location.href);
    } else {
      this.enableLTIMessage();
    }
  }
  enableLTIMessage() {
    window.addEventListener('message', this.handlePostMessage);
  }

  handlePostMessage(evt) {
    if (!evt.data || evt.data.type !== 'ltiParams') {
      return;
    }
    console.log('HLALALALLALA');
    document.getElementById('ltiiframe').remove();
    this.setState({ iframeParams: evt.data.params });
  }

  toggleGoogleCustomSearch(evt) {
    evt.preventDefault();
    this.setState({ active: !this.state.active });
  }
  render() {
    const containerClass = {
      'embed-search_container': true,
      'embed-search_container--active': this.state.active,
    };
    const params = this.state.iframeParams ? this.state.iframeParams : {};
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
        <button className="button button--primary button--block embed-search_open-button" onClick={this.toggleGoogleCustomSearch}>Søk i LTI</button>
        <div className={classNames(containerClass)}>
          <LTISearchFilter onFilterClick={onFilterClick} />
          <div id="ltiiframewrapper" className="lti-iframe_wrapper">
            <iframe id="ltiiframe" />
            {params && params.url ? <iframe src={decodeURIComponent(params.url)} /> : ''}
          </div>
        </div>
      </div>
    );
  }
}


LTISearch.propTypes = {
};

LTISearch.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export default LTISearch;
