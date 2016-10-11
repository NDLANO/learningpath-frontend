/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PintrestBoardForm from './PintrestBoardForm';
import PinForm from './PinForm';
import * as learningPathStepActions from '../learningPath/step/learningPathStepActions';
import { fetchPins } from './pintrestApi';

class PintrestImport extends Component {

  constructor(props) {
    super(props);
    this.state = { pins: [], fetchingPins: false };
    this.handleBoardNameSubmit = this.handleBoardNameSubmit.bind(this);
  }

  handleBoardNameSubmit(boardName) {
    this.setState({ fetchingPins: true });
    fetchPins(boardName)
      .then((pins) => {
        this.setState({ pins: pins.data });
        this.setState({ fetchingPins: false });
      }).catch(() => {
        this.setState({ fetchingPins: false });
      })
    ;
  }

  render() {
    const { pins } = this.state;
    const { createLearningPathStep } = this.props;
    return (
      <div>
        <PintrestBoardForm onBoardNameSubmit={this.handleBoardNameSubmit} />
        { pins.map(pin => <PinForm key={pin.id} pin={pin} createLearningPathStep={createLearningPathStep} />) }
      </div>
    );
  }
}

PintrestImport.propTypes = {
  createLearningPathStep: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createLearningPathStep: (learningPathId, step) => learningPathStepActions.createLearningPathStep(learningPathId, step),
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(PintrestImport);
