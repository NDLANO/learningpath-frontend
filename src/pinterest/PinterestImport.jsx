/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import PinterestBoardForm from './PinterestBoardForm';
import PinForm from './PinForm';
import polyglot from '../i18n';

const PinterestImport = ({ pins, handleBoardNameSubmit, handleCreateLearningPathStep }) => (
  <div className="pinterest-container">
    <h2>{ polyglot.t('pinterest.lightbox.heading') }</h2>
    <PinterestBoardForm onBoardNameSubmit={handleBoardNameSubmit} />
    { pins && pins.length > 0 ? <h3>{polyglot.t('pinterest.allPins')}</h3> : '' }
    { pins.map(pin => <PinForm key={pin.id} pin={pin} onCreateLearningPathStep={handleCreateLearningPathStep} />) }
  </div>
  );

PinterestImport.propTypes = {
  pins: PropTypes.array.isRequired,
  handleBoardNameSubmit: PropTypes.func.isRequired,
  handleCreateLearningPathStep: PropTypes.func.isRequired,
};

export default PinterestImport;
