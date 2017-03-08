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
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQueryChange(evt) {
    this.setState({ boardName: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onBoardNameSubmit(this.state.boardName);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <input
          type="text" className="search-form_query"
          onChange={this.handleQueryChange}
          value={this.state.boardName}
          placeholder={polyglot.t('pinterest.form.placeholder')}
        />

        <button
          type="submit"
          className="search-form_btn"
          style={{ marginLeft: '-6.2em' }}
        >
          {polyglot.t('pinterest.form.submit')}
        </button>
      </form>
    );
  }
}

PinterestBoardForm.propTypes = {
  boardName: PropTypes.string,
  onBoardNameSubmit: PropTypes.func.isRequired,
};

PinterestBoardForm.defaultProps = {
  boardName: '',
};

export default PinterestBoardForm;
