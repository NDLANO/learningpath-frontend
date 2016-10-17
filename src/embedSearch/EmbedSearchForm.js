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

const EmbedSearchForm = ({ localFetchEmbedSearch, onFilterClick, handleQueryChange, query, filters }) => {
  const filterClass = filter => classNames({
    'un-button': true,
    'google-custom-search_form-filter ': true,
    'google-custom-search_form-filter--active': query.filter === filter,
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


  return (
    <div className="google-custom-search_form">
      <h4>Legg til innhold fra ekstern kilde</h4>
      <input
        type="text" className="search-form_query--gray"
        onChange={handleQueryChange}
        onKeyPress={onKeyPress}
        value={query.q}
        placeholder="Søk og finn kilde"
      />
      <button className="search-form_btn--gray" onClick={submitEmbedSearch}><Icon.Search /></button>
      <div className="google-custom-search_form-filters">
        {filters.map(filter =>
          <button key={filter.key} className={filterClass(filter.key)} onClick={evt => onFilterClick(evt, filter.key)}>{filter.name}</button>
        )}
      </div>
    </div>
  );
};

EmbedSearchForm.propTypes = {
  localFetchEmbedSearch: PropTypes.func.isRequired,
  handleQueryChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default EmbedSearchForm;
