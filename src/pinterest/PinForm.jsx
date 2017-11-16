/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import polyglot from '../i18n';
import { transformHttpToHttps } from '../util/urlTransformer';

class PinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.pin.note,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange(evt) {
    this.setState({ title: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { onCreateLearningPathStep, pin } = this.props;
    const { title } = this.state;
    onCreateLearningPathStep(
      pin.id,
      title,
      transformHttpToHttps(pin.original_link),
    );
  }

  render() {
    const { pin } = this.props;
    const { title } = this.state;
    return (
      <div className="pin-container">
        <form onSubmit={this.handleSubmit}>
          <input
            id="title"
            type="text"
            onChange={this.handleTitleChange}
            value={title}
          />
          <button
            className="button--primary-outline cta-link--block pinterest_button"
            type="submit">
            {polyglot.t('pinterest.pinForm.create')}
          </button>
          <a
            className="button--primary-outline cta-link--block pinterest_button"
            target="_blank"
            rel="noopener noreferrer"
            href={transformHttpToHttps(pin.original_link)}>
            {polyglot.t('pinterest.pinForm.viewSource')}
          </a>
        </form>
      </div>
    );
  }
}

PinForm.propTypes = {
  pin: PropTypes.object.isRequired,
  onCreateLearningPathStep: PropTypes.func.isRequired,
};
export default PinForm;
