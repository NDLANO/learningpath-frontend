import React, { PropTypes } from 'react';
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
