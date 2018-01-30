/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const EmbedSearchResultImage = ({ thumbnail, title }) => (
    <div className="embed-search_result-img">
      <img role="presentation" src={thumbnail} alt={title} />
    </div>
  );

EmbedSearchResultImage.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default EmbedSearchResultImage;
