/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import Lightbox from '../common/Lightbox';
import Oembed from '../learningPath/step/oembed/Oembed';
import { oembedContentI18N } from '../util/i18nFieldFinder';
import polyglot from '../i18n';

const EmbedSearchPreview = ({ oembedPreview, oembedDisplay, onImageLightboxClose, lang }) => {
  const embedHasError = oembedPreview && oembedPreview.length > 0 ? oembedPreview[0].error : false;
  const embedContent = oembedPreview && !embedHasError ? oembedContentI18N({ embedUrl: oembedPreview }, lang) : oembedPreview;

  return (
    <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll big-lightbox_wrapper--center">
      <Lightbox display={oembedDisplay} onClose={onImageLightboxClose}>
        <h2>{polyglot.t('embedSearch.preview.title')}</h2>
        {embedHasError ? <p>{polyglot.t('embedSearch.preview.error')}</p> : <Oembed oembedContent={embedContent} />}
      </Lightbox>
    </div>
  );
};

EmbedSearchPreview.propTypes = {
  oembedPreview: PropTypes.array,
  oembedDisplay: PropTypes.bool.isRequired,
  onImageLightboxClose: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default EmbedSearchPreview;
