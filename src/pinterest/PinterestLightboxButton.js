import React from 'react';
import PropTypes from 'prop-types';
import PinterestLightbox from './PinterestLightbox';
import config from '../config';

const PINTEREST_ENABLED = __SERVER__ ? config.pinterestEnabled : window.config.pinterestEnabled;

const PinterestLightboxButton = ({ learningPath }) => {
  if (!PINTEREST_ENABLED || !learningPath.canEdit) {
    return null;
  }
  return (
    <PinterestLightbox />
  );
};

PinterestLightboxButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
};

export default PinterestLightboxButton;
