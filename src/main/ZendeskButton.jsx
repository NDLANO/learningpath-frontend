/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import polyglot from '../i18n';
import config from '../config';

const { zendeskHost } = config;

class ZendeskButton extends React.Component {
  constructor() {
    super();
    this.state = { lastScrollPos: 0, isOpen: true, location: null };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.location === null) {
      return {
        location: nextProps.location,
        isOpen: true,
      };
    }
    const { location } = nextProps;
    const navigated = location !== prevState.location;
    if (navigated) {
      return { isOpen: false, location };
    }
    return null;
  }

  handleScroll() {
    this.setState(prevState => ({
      isOpen: prevState.lastScrollPos > window.scrollY,
      lastScrollPos: window.scrollY,
    }));
  }

  render() {
    const zendeskClassNames = classNames({
      'c-zendesk__button': true,
      'c-zendesk__button--open': this.state.isOpen,
      'c-zendesk__button--hidden': !this.state.isOpen,
    });

    return zendeskHost ? (
      <button
        type="button"
        onClick={() => (window && window.zE ? window.zE.activate() : undefined)}
        className={zendeskClassNames}>
        {polyglot.t('askNDLA')}
      </button>
    ) : null;
  }
}

export default withRouter(ZendeskButton);
