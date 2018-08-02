/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
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
    const { children, width } = this.props;

    const style = width ? { maxWidth: width } : undefined;

    return this.state.display ? (
      <div className="lightbox">
        <div className="lightbox_content" style={style}>
          <button
            type="button"
            className="un-button close-dialog"
            onClick={this.onCloseButtonClick}>
            <Icon.Clear />
          </button>
          {children}
        </div>
      </div>
    ) : null;
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func,
  display: PropTypes.bool,
  width: PropTypes.string,
};

Lightbox.defaultProps = {
  display: true,
  onClose: () => {},
};
