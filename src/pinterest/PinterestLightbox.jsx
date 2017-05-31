/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PinterestImport from './PinterestImport';
import Lightbox from '../common/Lightbox';
import * as learningPathStepActions from '../learningPath/step/learningPathStepActions';
import * as pinterestActions from './pinterestActions';
import { getPins } from './pinterestSelectors';
import { getLocale } from '../locale/localeSelectors';
import config from '../config';

const PINTEREST_ENABLED = __SERVER__ ? config.pinterestEnabled : window.config.pinterestEnabled;

class PinterestLightbox extends Component {
  constructor(props) {
    super(props);
    this.handleBoardNameSubmit = this.handleBoardNameSubmit.bind(this);
    this.handleCreateLearningPathStep = this.handleCreateLearningPathStep.bind(this);
  }


  handleBoardNameSubmit(username, boardName) {
    this.props.localFetchPins(username, boardName);
    this.props.localSetFetchingPins(true);
  }

  handleCreateLearningPathStep(pinId, title, url) {
    const { createLearningPathStep, pins, localSetPins, learningPath, locale: language } = this.props;
    createLearningPathStep(learningPath.id, {
      type: 'TEXT',
      showTitle: true,
      title: [{ title, language }],
      embedUrl: [{ url, language, embedType: 'oembed' }],
    }).then(() => {
      localSetPins(pins.filter(pin => pin.id !== pinId));
    });
  }

  render() {
    const { pins, showLightBox, toggleLightBox, learningPath } = this.props;
    if (!PINTEREST_ENABLED || !learningPath.canEdit) {
      return null;
    }
    return (
      <div className="pinterest-lightbox_container">
        <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll">
          <Lightbox display={showLightBox} width="800px" onClose={toggleLightBox}>
            <PinterestImport
              handleCreateLearningPathStep={this.handleCreateLearningPathStep}
              handleBoardNameSubmit={this.handleBoardNameSubmit}
              pins={pins}
            />
          </Lightbox>
        </div>
      </div>
    );
  }
}

PinterestLightbox.propTypes = {
  locale: PropTypes.string.isRequired,
  createLearningPathStep: PropTypes.func.isRequired,
  localSetPins: PropTypes.func.isRequired,
  pins: PropTypes.array.isRequired,
  localFetchPins: PropTypes.func.isRequired,
  localSetFetchingPins: PropTypes.func.isRequired,
  localRemovePins: PropTypes.func.isRequired,
  showLightBox: PropTypes.bool.isRequired,
  toggleLightBox: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  createLearningPathStep: (learningPathId, step) => learningPathStepActions.createLearningPathStep(learningPathId, step),
  localSetPins: pinterestActions.setPins,
  localSetFetchingPins: pinterestActions.setFetchingPins,
  localFetchPins: pinterestActions.fetchPinterestPins,
  localRemovePins: pinterestActions.removePins,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
  pins: getPins(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(PinterestLightbox);
