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
import polyglot from '../i18n';
import Button from '../common/buttons/Button';
import * as learningPathStepActions from '../learningPath/step/learningPathStepActions';
import * as pinterestActions from './pinterestActions';
import { getPins } from './pinterestSelectors';
import { getLocale } from '../locale/localeSelectors';
import { getLearningPathId } from '../learningPath/learningPathSelectors';

class PinterestLightbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayLightbox: false,
    };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.handleBoardNameSubmit = this.handleBoardNameSubmit.bind(this);
    this.handleCreateLearningPathStep = this.handleCreateLearningPathStep.bind(this);
  }

  openLightbox() {
    this.setState({ displayLightbox: true });
  }

  closeLightbox() {
    this.setState({ displayLightbox: false });
    this.props.localRemovePins();
  }

  handleBoardNameSubmit(username, boardName) {
    this.props.localFetchPins(username, boardName);
    this.props.localSetFetchingPins(true);
  }

  handleCreateLearningPathStep(pinId, title, url) {
    const { createLearningPathStep, pins, localSetPins, learningPathId, locale: language } = this.props;
    createLearningPathStep(learningPathId, {
      type: 'TEXT',
      showTitle: true,
      title: [{ title, language }],
      embedUrl: [{ url, language, embedType: 'oembed' }],
    }).then(() => {
      localSetPins(pins.filter(pin => pin.id !== pinId));
    });
  }

  render() {
    const { pins } = this.props;
    return (
      <div className="pinterest-lightbox_container">
        <Button className="button button--primary-outline cta-link--block pinterest-lightbox_button" onClick={this.openLightbox}>
          {polyglot.t('pinterest.importFrom')}
        </Button>
        <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll">
          <Lightbox display={this.state.displayLightbox} width="800px" onClose={this.closeLightbox}>
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
  learningPathId: PropTypes.number.isRequired,
  locale: PropTypes.string.isRequired,
  createLearningPathStep: PropTypes.func.isRequired,
  localSetPins: PropTypes.func.isRequired,
  pins: PropTypes.array.isRequired,
  localFetchPins: PropTypes.func.isRequired,
  localSetFetchingPins: PropTypes.func.isRequired,
  localRemovePins: PropTypes.func.isRequired,
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
  learningPathId: getLearningPathId(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(PinterestLightbox);
