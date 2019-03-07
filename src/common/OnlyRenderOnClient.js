/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

export class OnlyRenderOnClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = { appIsMounted: false };
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ appIsMounted: true });
    });
  }

  render() {
    return this.state.appIsMounted ? this.props.children : null;
  }
}

OnlyRenderOnClient.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OnlyRenderOnClient;
