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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { onCreateLearningPathStep, pin } = this.props;
    onCreateLearningPathStep(pin.note, pin.original_link);
  }

  render() {
    const { pin } = this.props;
    return (
      <div style={{ height: '5em' }}>
        <form onSubmit={this.handleSubmit}>
          <input id="title" type="text" style={{ width: '50%', marginRight: '1em', height: '3.5em' }} defaultValue={pin.note} />
          <button className="button button--primary" type="submit">{polyglot.t('pintrest.pinForm.create')}</button>
          <a className="button button--outline" style={{ float: 'right' }} href={pin.original_link}>{polyglot.t('pintrest.pinForm.viewSource')}</a>
        </form>
      </div>
    );
  }
}

PinForm.propTypes = {
  pin: PropTypes.object.isRequired,
  learningPathId: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  onCreateLearningPathStep: PropTypes.func.isRequired,
};
export default PinForm;
