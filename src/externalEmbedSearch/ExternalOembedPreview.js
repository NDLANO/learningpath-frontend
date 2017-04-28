/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Oembed from '../learningPath/step/oembed/Oembed';
import polyglot from '../i18n';
import Icon from '../common/Icon';

const ExternalOembedPreview = ({ oembedPreview, oembedDisplay, onPreviewboxClose }) => {
  const embedHasError = oembedPreview && oembedPreview.length > 0 ? oembedPreview.error : false;
  const embedContent = oembedPreview && !embedHasError ? oembedPreview : oembedPreview;
  const divClassName = classNames({
    'external-oembed_preview': true,
    'external-oembed_preview--active': oembedDisplay,
  });
  return (
    <div className={divClassName}>
      <button className="un-button close-dialog" onClick={onPreviewboxClose}>
        <Icon.Clear />
      </button>
      {oembedPreview.error ? <p>{polyglot.t('embedSearch.preview.error')}</p> : <Oembed oembedContent={embedContent} embedType="oembed" />}
    </div>
  );
};

ExternalOembedPreview.propTypes = {
  oembedPreview: PropTypes.object,
  oembedDisplay: PropTypes.bool.isRequired,
  onPreviewboxClose: PropTypes.func.isRequired,
};

export default ExternalOembedPreview;
