import React from 'react';
import PinterestLightbox from './PinterestLightbox';
import config from '../config';

const PINTEREST_ENABLED = __SERVER__ ? config.pinterestEnabled : window.config.pinterestEnabled;

const PinterestLightboxButton = () => {
  if (!PINTEREST_ENABLED) {
    return null;
  }
  return (
    <PinterestLightbox />
  );
};

export default PinterestLightboxButton;
