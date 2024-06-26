/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import polyglot from "../i18n";
import { scaleImage } from "../util/imageScaler";

export default function PreviewImage({ image, onSaveImage }) {
  const authors = image.copyright.creators.concat(image.copyright.rightsholders).concat(image.copyright.processors);
  return (
    <div className="image-preview">
      <div className="image-preview_image">
        <img role="presentation" src={scaleImage(image?.imageUrl ?? image?.image?.imageUrl)} alt={image.alttext} />
      </div>
      <div className="image-preview_information">
        <h2 className="image-preview_title">{image.title}</h2>
        <div className="image-prieview_copyright-author">
          <b className="image-preview_text--left">{polyglot.t("learningPath.image.authors")}</b>
          <span className="image-preview_text--right">{authors.map((author) => author.name).join(", ")}</span>
        </div>
        <div className="image-prieview_license">
          <b className="image-preview_text--left">{polyglot.t("learningPath.image.copyright")}</b>
          <span className="image-preview_text--right">{image.copyright.license.description}</span>
        </div>
        <div className="image-preview_tags">
          <b>{polyglot.t("learningPath.image.tags")}</b>
          {image.tags.map((tag) => (
            <span key={tag} className="tag_item">{`#${tag}`}</span>
          ))}
        </div>
        <button type="button" className="button button--primary button--block" onClick={onSaveImage}>
          {polyglot.t("learningPath.image.choseImage")}
        </button>
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
