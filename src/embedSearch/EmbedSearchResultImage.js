/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import requireAssets from '../util/requireAssets';

const EmbedSearchResultImage = ({ pagemap }) => {
  const imageSource = () => {
    if (pagemap && pagemap.cse_thumbnail && pagemap.cse_thumbnail.length > 0) {
      return pagemap.cse_thumbnail[0].src;
    }
    return `/assets/${requireAssets['placeholder.png']}`;
  };

  return (
    <div className="embed-search_result-img">
      <img role="presentation" src={imageSource()} />
    </div>
  );
};

EmbedSearchResultImage.propTypes = {
  pagemap: PropTypes.object.isRequired,
};

export default EmbedSearchResultImage;
