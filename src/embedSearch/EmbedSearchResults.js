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

const EmbedSearchResults = ({ items, onPreviewClick, addEmbedResult, query, pagerAction }) => {
  if (!items || items.length === 0) {
    return (
      <div className="google-custom-search_results">
        <p>Ingen resultater funnet</p>
      </div>
    );
  }
  const onPagerButtonClicked = (q) => {
    if (q.page > query.page) {
      pagerAction(Object.assign({}, q, { start: query.nextIndex }));
    } else {
      pagerAction(Object.assign({}, q, { start: query.previousIndex }));
    }
  };
  return (
    <div className="google-custom-search_results">
      {items.map(item =>
        <EmbedSearchResult key={item.cacheId} item={item} onPreviewClick={onPreviewClick} addEmbedResult={addEmbedResult} />
      )}
      <ButtonPager page={query.page} lastPage={query.numberOfPages} query={query} pagerAction={onPagerButtonClicked} />
    </div>

  );
};
EmbedSearchResults.propTypes = {
  items: PropTypes.array.isRequired,
  onPreviewClick: PropTypes.func.isRequired,
  addEmbedResult: PropTypes.func.isRequired,
};

export default EmbedSearchResults;
