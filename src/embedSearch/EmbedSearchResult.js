/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import EmbedSearchResultImage from './EmbedSearchResultImage';
import Icon from '../common/Icon';
import polyglot from '../i18n';

const EmbedSearchResult = ({ item, onPreviewClick, addEmbedResult }) => (
  <div className="embed-search_result">
    <EmbedSearchResultImage thumbnail={item.thumbnail} title={item.title} />
    <div className="embed-search_result-information">
      <h3 className="embed-search_result-title">{item.title}</h3>
      {item.showUrl ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.link}
        </a>
      ) : (
        ''
      )}
      <p>{item.introduction}</p>
      <span className="error_message error_message--red">
        {item.disable ? 'Denne resursen kan ikke brukes.' : ''}
      </span>
      <div>
        <button
          onClick={evt => addEmbedResult(evt, item.link)}
          className="un-button google-custom-search_add-button"
          disabled={item.disable}>
          <Icon.Add />
          {polyglot.t('embedSearch.results.useInPath')}
        </button>
        <button
          onClick={evt => onPreviewClick(evt, item)}
          className="un-button embed-search_preview-button"
          disabled={item.disable}>
          <Icon.RemoveRedEye />
          {polyglot.t('embedSearch.results.preview')}
        </button>
      </div>
    </div>
  </div>
);

EmbedSearchResult.propTypes = {
  item: PropTypes.object.isRequired,
  onPreviewClick: PropTypes.func.isRequired,
  addEmbedResult: PropTypes.func.isRequired,
};

export default EmbedSearchResult;
