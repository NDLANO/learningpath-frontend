/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../common/Icon';

const EmbedSearchForm = ({ localFetchEmbedSearch, localChangeEmbedSearchQuery, query }) => {
  const filterClass = filter => classNames({
    'un-button': true,
    'embed-search_form-filter ': true,
    'embed-search_form-filter--active': query.filter === filter,
  });
  const onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      localFetchEmbedSearch(query);
    }
  };
  const submitEmbedSearch = (evt) => {
    evt.preventDefault();
    localFetchEmbedSearch(query);
  };
  const handleFilterChange = (evt, filter) => {
    evt.preventDefault();
    localFetchEmbedSearch(Object.assign({}, this.props.query, { filter }));
  };
  const filters = [{ name: 'Alle', key: '' }, { name: 'Youtube', key: 'more:youtube' }, { name: 'NDLA', key: 'more:ndla' }];

  return (
    <div className="embed-search_form">
      <h4>Legg til innhold fra ekstern kilde</h4>
      <input
        type="text" className="search-form_query--gray"
        onChange={evt => localChangeEmbedSearchQuery(Object.assign({}, query, { q: evt.target.value }))}
        onKeyPress={onKeyPress}
        placeholder="Søk og finn kilde"
      />
      <button className="search-form_btn--gray" onClick={submitEmbedSearch}><Icon.Search /></button>
      <div className="embed-search_form-filters">
        {filters.map(filter =>
          <button key={filter.key} className={filterClass(filter.key)} onClick={evt => handleFilterChange(evt, filter.key)}>{filter.name}</button>
        )}
      </div>
    </div>
  );
};

EmbedSearchForm.propTypes = {
  localFetchEmbedSearch: PropTypes.func.isRequired,
  localChangeEmbedSearchQuery: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
};

export default EmbedSearchForm;
