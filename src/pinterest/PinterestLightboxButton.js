import React from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import Button from '../common/buttons/Button';
import polyglot from '../i18n';

const PINTEREST_ENABLED = config.pinterestEnabled;

const PinterestLightboxButton = ({ learningPath, toggleLightBox }) => {
  if (!PINTEREST_ENABLED || !learningPath.canEdit) {
    return null;
  }
  return (
    <div className="add-from-pinterest">
      <Button
        className="button button--primary-outline cta-link--block pinterest-lightbox_button"
        onClick={toggleLightBox}>
        <div className="pinterest-sign--circle">P</div>
        {polyglot.t('pinterest.importFrom')}
      </Button>
    </div>
  );
};

PinterestLightboxButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
  toggleLightBox: PropTypes.func.isRequired,
};

export default PinterestLightboxButton;
