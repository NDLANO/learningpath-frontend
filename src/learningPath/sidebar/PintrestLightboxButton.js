/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import PintrestLightbox from './PintrestLightbox';
import config from '../../config';

const PINTREST_ENABLED = __SERVER__ ? config.pintrestEnabled : window.config.pintrestEnabled;

const PintrestLightboxButton = ({ learningPath }) => {
  if (!PINTREST_ENABLED) {
    return null;
  }
  return (
    <ul className="vertical-menu">
      <li className="vertical-menu_item">
        <PintrestLightbox learningPath={learningPath} />
      </li>
    </ul>
  );
};

PintrestLightboxButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
};

export default PintrestLightboxButton;
