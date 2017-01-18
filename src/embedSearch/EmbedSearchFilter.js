/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import polyglot from '../i18n';

const EmbedSearchFilter = ({ localFetchEmbedSearch, query, textQuery }) => {
  const filterClass = filter => classNames({
    'un-button': true,
    'embed-search_form-filter ': true,
    'embed-search_form-filter--active': query.filter === filter,
  });

  const handleFilterChange = (evt, filter) => {
    evt.preventDefault();
    localFetchEmbedSearch(Object.assign({}, query, { filter, textQuery }));
  };

  const filters = [{ name: 'NDLA', key: 'more:ndla' }, { name: 'Youtube', key: 'more:youtube' }];

  return (
    <div className="embed-search_form-filters">
      {filters.map(filter =>
        <button key={filter.key} className={filterClass(filter.key)} onClick={evt => handleFilterChange(evt, filter.key)}>{filter.name}</button>
      )}
    </div>
  );
};

EmbedSearchFilter.propTypes = {
  localFetchEmbedSearch: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  textQuery: PropTypes.string.isRequired,
};

export default EmbedSearchFilter;
