/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import polyglot from '../i18n';
import { scaleImage } from '../util/imageScaler';

export default function PreviewImage({ image, onSaveImage }) {
  return (
    <div className="image-preview">
      <div className="image-preview_image">
        <img role="presentation" src={scaleImage(image.imageUrl)} />
      </div>
      <div className="image-preview_information">
        <h2 className="image-preview_title">{image.titles[0].title}</h2>
        <div className="image-prieview_copyright-author">
          <b className="image-preview_text--left">
            {polyglot.t('learningPath.image.authors')}
          </b>
          <span className="image-preview_text--right">
            {image.copyright.authors.map(author =>
              author.name
            ).join(', ')}
          </span>
        </div>
        <div className="image-prieview_license">
          <b className="image-preview_text--left">
            {polyglot.t('learningPath.image.copyright')}
          </b>
          <span className="image-preview_text--right">
            {image.copyright.license.description}
          </span>
        </div>
        <div className="image-preview_tags">
          <b>{polyglot.t('learningPath.image.tags')}</b>
          {image.tags.map((tag, index) =>
            <span key={`${tag}_${index}`} className="tag_item">{`#${tag}`}</span>
          )}
        </div>
        <button className="button button--primary button--block" onClick={onSaveImage}>{polyglot.t('learningPath.image.choseImage')}</button>
      </div>
      <div className="clear" />
    </div>
  );
}

PreviewImage.propTypes = {
  image: PropTypes.object.isRequired,
  onSaveImage: PropTypes.func.isRequired,
};

PreviewImage.contextTypes = {
  lang: PropTypes.string.isRequired,
};
