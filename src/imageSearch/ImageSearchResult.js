/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PreviewImage from "./PreviewImage";
import { scaleImage } from "../util/imageScaler";

export default function ImageSearch({ image, onImageClick, selectedImage, onSaveImage }) {
  const activeClassName = () =>
    classNames({
      "image_list-item": true,
      "image_list-item--active": selectedImage.id === image.id,
    });
  const alttext = image.altText ? image.altText.alttext : "";
  return (
    <div key={image.id} className={activeClassName()}>
      <div className="image_list-item-inner">
        <button type="button" className="un-button" onClick={(evt) => onImageClick(evt, image)}>
          <img role="presentation" src={scaleImage(image.previewUrl)} alt={alttext} />
        </button>
      </div>
      {selectedImage.id === image.id ? (
        <PreviewImage image={selectedImage} onSaveImage={(evt) => onSaveImage(evt, selectedImage)} />
      ) : (
        ""
      )}
    </div>
  );
}

ImageSearch.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
  selectedImage: PropTypes.object,
  onSaveImage: PropTypes.func.isRequired,
};
