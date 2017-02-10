/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import EmbedSearchResult from './EmbedSearchResult';
import ButtonPager from '../common/pager/ButtonPager';
import polyglot from '../i18n';

const EmbedSearchResults = ({ items, onPreviewClick, addEmbedResult, query, pagerAction, oembedComponent }) => {
  if (!items || items.length === 0) {
    return (
      <div className="embed-search_results">
        <p>{polyglot.t('embedSearch.results.noResults')}</p>
      </div>
    );
  }
  const onPagerButtonClicked = (q) => {
    const nextIndex = query.start + ((q.page - query.page) * 10);
    pagerAction(Object.assign({}, q, { start: nextIndex }));
  };
  return (
    <div className="embed-search_results">
      {items.map(item =>
        <div>
          <EmbedSearchResult key={item.cacheId} item={item} onPreviewClick={onPreviewClick} addEmbedResult={addEmbedResult} />
          {oembedComponent ? oembedComponent : ''}
        </div>
      )}
      <ButtonPager page={query.page} lastPage={query.numberOfPages} query={query} pagerAction={onPagerButtonClicked} />
    </div>

  );
};
EmbedSearchResults.propTypes = {
  items: PropTypes.array.isRequired,
  onPreviewClick: PropTypes.func.isRequired,
  addEmbedResult: PropTypes.func.isRequired,
  pagerAction: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  oembedComponent: PropTypes.object,
};

export default EmbedSearchResults;
