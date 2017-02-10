/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Oembed from '../learningPath/step/oembed/Oembed';
import polyglot from '../i18n';
import Icon from '../common/Icon';

const ExternalOembedPreview = ({ oembedPreview, oembedDisplay, onPreviewboxClose }) => {
  const embedHasError = oembedPreview && oembedPreview.length > 0 ? oembedPreview[0].error : false;
  const embedContent = oembedPreview && !embedHasError ? oembedPreview : oembedPreview;
  const divClassName = classNames({
    'external-embed-search_container': true,
    'external-embed-search_container--display': oembedDisplay,
  });

  return (
    <div className={divClassName}>
      <button className="un-button close-dialog" onClick={onPreviewboxClose}>
        <Icon.Clear />
      </button>
      {embedHasError ? <p>{polyglot.t('embedSearch.preview.error')}</p> : <Oembed oembedContent={embedContent} embedType="oembed" />}
    </div>
  );
};

ExternalOembedPreview.propTypes = {
  oembedPreview: PropTypes.object,
  oembedDisplay: PropTypes.bool.isRequired,
  onPreviewboxClose: PropTypes.func.isRequired,
};

export default ExternalOembedPreview;
