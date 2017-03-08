import React, { PropTypes } from 'react';
import PinterestLightbox from './PinterestLightbox';
import config from '../../config';

const PINTEREST_ENABLED = __SERVER__ ? config.pinterestEnabled : window.config.pinterestEnabled;

const PinterestLightboxButton = ({ learningPath }) => {
  if (!PINTEREST_ENABLED) {
    return null;
  }
  return (
    <ul className="vertical-menu">
      <li className="vertical-menu_item">
        <PinterestLightbox learningPath={learningPath} />
      </li>
    </ul>
  );
};

PinterestLightboxButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
};

export default PinterestLightboxButton;
