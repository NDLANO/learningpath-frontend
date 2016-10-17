/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import EmbedSearchResultImage from './EmbedSearchResultImage';
import Icon from '../common/Icon';

const EmbedSearchResult = ({ item, onPreviewClick, addEmbedResult }) => {
  return (
    <div className="google-custom-search_result" >
      <EmbedSearchResultImage labels={item.labels} pagemap={item.pagemap} />
      <div className="google-custom-search_result-information">
        <h3 className="google-custom-search_result-title">{item.title}</h3>
        <Link to={item.link}>{item.link}</Link>
        <p>
          {item.snippet}
        </p>
        <div>
          <button onClick={evt => addEmbedResult(evt, item)} className="un-button google-custom-search_add-button">
            <Icon.Add />
            Bruk i læringsstien
          </button>
          <button onClick={evt => onPreviewClick(evt, item)} className="un-button google-custom-search_preview-button">
            <Icon.RemoveRedEye />
            Forhåndsvis
          </button>
        </div>
      </div>
    </div>
  );
};

EmbedSearchResult.propTypes = {
  item: PropTypes.object.isRequired,
  onPreviewClick: PropTypes.func.isRequired,
  addEmbedResult: PropTypes.func.isRequired,
};

export default EmbedSearchResult;
