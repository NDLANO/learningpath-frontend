/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';

const EmbedSearchResultImage = ({ pagemap, labels }) => {
  const imageSource = () => {
    if (pagemap && pagemap.cse_image && pagemap.cse_image.length > 0) {
      return pagemap.cse_image[0].src;
    }
    const placeholderName = labels && labels.length > 0 ? labels[0].displayName : 'NDLA';
    return `https://placeholdit.imgix.net/~text?txtsize=33&txt=${placeholderName}&w=190&h=120`;
  };

  return (
    <div className="google-custom-search_result-img">
      <img role="presentation" src={imageSource()} />
    </div>
  );
};

EmbedSearchResultImage.propTypes = {
  pagemap: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
};

export default EmbedSearchResultImage;
