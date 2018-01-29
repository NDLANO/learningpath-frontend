/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

const mountedInstances = [];

const withTracker = WrappedComponent => {
  const Tracker = class extends Component {
    static trackPageView(props) {
      const lastMountedInstance = mountedInstances[mountedInstances.length - 1];
      const url = window.historyTracker[window.historyTracker.length - 1];

      if (
        url === undefined ||
        lastMountedInstance !== WrappedComponent ||
        url.tracked === true
      ) {
        return;
      }
      url.tracked = true;
      const title = WrappedComponent.getDocumentTitle(props);
      console.log(`track ${title} - ${url.url}`);
    }

    componentWillMount() {
      mountedInstances.push(WrappedComponent);

      if (!WrappedComponent.getDocumentTitle) {
        throw new Error(
          `Tracker expects a static getDocumentTitle function on the WrappedComponent.`,
        );
      }
    }

    componentDidMount() {
      if (WrappedComponent.willTrackPageView) {
        WrappedComponent.willTrackPageView(Tracker.trackPageView, this.props);
      } else {
        Tracker.trackPageView(this.props);
      }
    }

    componentDidUpdate() {
      if (WrappedComponent.willTrackPageView) {
        WrappedComponent.willTrackPageView(Tracker.trackPageView, this.props);
      } else {
        Tracker.trackPageView(this.props);
      }
    }

    componentWillUnmount() {
      const index = mountedInstances.indexOf(WrappedComponent);
      mountedInstances.splice(index, 1);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          trackPageView={Tracker.trackPageView}
        />
      );
    }
  };

  return hoistStatics(Tracker, WrappedComponent);
};

export default withTracker;
