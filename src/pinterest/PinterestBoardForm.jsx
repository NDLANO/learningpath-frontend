/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
import polyglot from '../i18n';

class PinterestBoardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: props.boardName,
      username: props.username,
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQueryChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onBoardNameSubmit(this.state.username, this.state.boardName);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="pinterest-search-form">
        <input
          type="text"
          onChange={this.handleQueryChange}
          value={this.state.username}
          name="username"
          placeholder={polyglot.t('pinterest.form.usernamePlaceholder')}
        />
        <input
          type="text"
          onChange={this.handleQueryChange}
          value={this.state.boardName}
          name="boardName"
          placeholder={polyglot.t('pinterest.form.boardPlaceholder')}
        />
        <button
          type="submit"
          className="button--primary-outline cta-link--block pinterest_button"
        >
          {polyglot.t('pinterest.form.submit')}
        </button>
      </form>
    );
  }
}

PinterestBoardForm.propTypes = {
  boardName: PropTypes.string,
  username: PropTypes.string,
  onBoardNameSubmit: PropTypes.func.isRequired,
};

PinterestBoardForm.defaultProps = {
  boardName: '',
  username: '',
};

export default PinterestBoardForm;
