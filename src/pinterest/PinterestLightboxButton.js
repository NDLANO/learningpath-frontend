import React from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import Button from '../common/buttons/Button';
import polyglot from '../i18n';

const PINTEREST_ENABLED = __SERVER__ ? config.pinterestEnabled : window.config.pinterestEnabled;

const PinterestLightboxButton = ({ learningPath, toggleLightBox }) => {
  if (!PINTEREST_ENABLED || !learningPath.canEdit) {
    return null;
  }
  return (
    <Button className="button button--primary-outline cta-link--block pinterest-lightbox_button" onClick={toggleLightBox}>
      {polyglot.t('pinterest.importFrom')}
    </Button>
  );
};

PinterestLightboxButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
  toggleLightBox: PropTypes.func.isRequired,
};

export default PinterestLightboxButton;
