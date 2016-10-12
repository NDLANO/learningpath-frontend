/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
import polyglot from '../i18n';

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
    onCreateLearningPathStep(pin.id, title, pin.original_link);
  }

  render() {
    const { pin } = this.props;
    const { title } = this.state;
    return (
      <div style={{ height: '5em' }}>
        <form onSubmit={this.handleSubmit}>
          <input id="title" type="text" style={{ width: '50%', marginRight: '1em', height: '3.5em' }} onChange={this.handleTitleChange} value={title} />
          <button className="button button--primary" type="submit">{polyglot.t('pintrest.pinForm.create')}</button>
          <a className="button button--outline" target="_blank" rel="noopener noreferrer" style={{ float: 'right' }} href={pin.original_link}>{polyglot.t('pintrest.pinForm.viewSource')}</a>
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
