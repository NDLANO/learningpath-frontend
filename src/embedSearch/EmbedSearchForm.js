/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../common/Icon';
import polyglot from '../i18n';

const EmbedSearchForm = ({
  localFetchEmbedSearch,
  handleTextQueryChange,
  query,
  textQuery,
}) => {
  const submitEmbedSearch = evt => {
    evt.preventDefault();
    const newQuery = Object.assign({}, query, {
      start: textQuery === query.textQuery ? query.start : 1,
      page: textQuery === query.textQuery ? query.page : 1,
      textQuery,
    });
    localFetchEmbedSearch(newQuery);
  };

  const onKeyPress = evt => {
    if (evt.key === 'Enter') {
      submitEmbedSearch(evt);
    }
  };

  return (
    <div className="embed-search_form">
      <input
        type="text"
        className="search-form_query--gray"
        onChange={handleTextQueryChange}
        onKeyPress={onKeyPress}
        placeholder={polyglot.t('embedSearch.form.placeholder')}
        value={textQuery}
      />
      <button className="search-form_btn--gray" onClick={submitEmbedSearch}>
        <Icon.Search />
      </button>
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
