/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import Icon from './Icon';

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: props.display };
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
  }

  componentWillReceiveProps(props) {
    const { display } = props;
    this.setState({ display });
  }

  onCloseButtonClick(evt) {
    this.setState({ display: false }, () => this.props.onClose());
    evt.preventDefault();
  }

  render() {
    const { children } = this.props;

    return this.state.display ? <div className="lightbox">
      <div className="lightbox_content">
        <a href="#" className="close-dialog" onClick={this.onCloseButtonClick}>
          <Icon.Clear />
        </a>
        {children}
      </div>
    </div> : null;
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func,
  display: PropTypes.bool,
};

Lightbox.defaultProps = {
  display: true,
  onClose: () => {},
};
