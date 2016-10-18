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
import polyglot from '../i18n';

const EmbedSearchForm = ({ localFetchEmbedSearch, handleTextQueryChange, query, textQuery }) => {
  const filterClass = filter => classNames({
    'un-button': true,
    'embed-search_form-filter ': true,
    'embed-search_form-filter--active': query.filter === filter,
  });

  const submitEmbedSearch = (evt) => {
    evt.preventDefault();
    const newQuery = Object.assign({}, query, {
      start: textQuery === query.textQuery ? query.start : 1,
      page: textQuery === query.textQuery ? query.page : 1,
      textQuery,
    });
    localFetchEmbedSearch(newQuery);
  };

  const onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      submitEmbedSearch(evt);
    }
  };

  const handleFilterChange = (evt, filter) => {
    evt.preventDefault();
    localFetchEmbedSearch(Object.assign({}, query, { filter }));
  };

  const filters = [{ name: polyglot.t('embedSearch.form.allFilter'), key: '' }, { name: 'Youtube', key: 'more:youtube' }, { name: 'NDLA', key: 'more:ndla' }];

  return (
    <div className="embed-search_form">
      <h4>{polyglot.t('embedSearch.form.title')}</h4>
      <input
        type="text" className="search-form_query--gray"
        onChange={handleTextQueryChange}
        onKeyPress={onKeyPress}
        placeholder={polyglot.t('embedSearch.form.placeholder')}
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
  handleTextQueryChange: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  textQuery: PropTypes.string.isRequired,
};

export default EmbedSearchForm;
