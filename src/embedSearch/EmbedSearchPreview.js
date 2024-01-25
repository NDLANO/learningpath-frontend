/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import Lightbox from "../common/Lightbox";
import Oembed from "../learningPath/step/oembed/Oembed";
import polyglot from "../i18n";

const EmbedSearchPreview = ({ oembedPreview, oembedDisplay, onImageLightboxClose }) => (
  <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll big-lightbox_wrapper--center">
    <Lightbox display={oembedDisplay} onClose={onImageLightboxClose}>
      <h2>{polyglot.t("embedSearch.preview.title")}</h2>
      {oembedPreview.error ? (
        <p>{polyglot.t("embedSearch.preview.error")}</p>
      ) : (
        <Oembed oembedContent={oembedPreview} embedType="oembed" />
      )}
    </Lightbox>
  </div>
);

EmbedSearchPreview.propTypes = {
  oembedPreview: PropTypes.object,
  oembedDisplay: PropTypes.bool.isRequired,
  onImageLightboxClose: PropTypes.func.isRequired,
};

export default EmbedSearchPreview;
