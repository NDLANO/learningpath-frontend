/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const EmbedSearchResultImage = ({ thumbnail, title, thumbnailAlt }) => (
  <div className="embed-search_result-img">
    <img role="presentation" src={thumbnail} alt={thumbnailAlt || title} />
  </div>
);

EmbedSearchResultImage.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string,
  thumbnailAlt: PropTypes.string,
};

export default EmbedSearchResultImage;
