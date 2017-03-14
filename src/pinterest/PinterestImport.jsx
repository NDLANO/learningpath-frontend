/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PinterestBoardForm from './PinterestBoardForm';
import PinForm from './PinForm';
import { getLocale } from '../locale/localeSelectors';
import * as learningPathStepActions from '../learningPath/step/learningPathStepActions';
import { fetchPins } from './pinterestApi';
import polyglot from '../i18n';

class PinterestImport extends Component {

  constructor(props) {
    super(props);
    this.state = { pins: [], fetchingPins: false, message: '' };
    this.handleBoardNameSubmit = this.handleBoardNameSubmit.bind(this);
    this.handleCreateLearningPathStep = this.handleCreateLearningPathStep.bind(this);
  }

  handleBoardNameSubmit(username, boardName) {
    console.log(boardName);
    this.setState({ fetchingPins: true });
    fetchPins(username, boardName)
      .then((pins) => {
        this.setState({
          pins: pins.data,
          fetchingPins: false,
          message: '',
        });
      }).catch((error) => {
        this.setState({
          message: error.message,
          fetchingPins: false,
        });
      })
    ;
  }

  handleCreateLearningPathStep(pinId, title, url) {
    const { createLearningPathStep, learningPath, locale: language } = this.props;
    const { pins } = this.state;

    createLearningPathStep(learningPath.id, {
      type: 'TEXT',
      showTitle: true,
      title: [{ title, language }],
      embedUrl: [{ url, language }],
    }).then(() => {
      this.setState({ pins: pins.filter(pin => pin.id !== pinId) });
    });
  }

  render() {
    const { pins, message } = this.state;
    return (
      <div>
        <h2>{ polyglot.t('pinterest.lightbox.heading') }</h2>
        <PinterestBoardForm onBoardNameSubmit={this.handleBoardNameSubmit} />
        { message ? <div className="error_message error_message--red">{ message }</div> : null}
        { pins.map(pin => <PinForm key={pin.id} pin={pin} onCreateLearningPathStep={this.handleCreateLearningPathStep} />) }
      </div>
    );
  }
}

PinterestImport.propTypes = {
  locale: PropTypes.string.isRequired,
  createLearningPathStep: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  createLearningPathStep: (learningPathId, step) => learningPathStepActions.createLearningPathStep(learningPathId, step),
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(PinterestImport);
