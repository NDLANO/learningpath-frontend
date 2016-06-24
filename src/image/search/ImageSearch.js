import React, { PropTypes } from 'react';
import polyglot from '../../i18n';
import Icon from '../../components/Icon';

export default function ImageSearch(props) {
  const { onSubmit, query, localChangeImageSearchQuery } = props;
  const onQueryChange = (evt) => {
    let newQuery = {};
    if (query.query === evt.target.value) {
      newQuery = {query: evt.target.value, 'page-size': 16, page: query.page};
    } else {
      newQuery = {query: evt.target.value, 'page-size': 16, page: 1};
    }
    localChangeImageSearchQuery(newQuery);
  };
  return (
    <div className="image-search">
      <h2>Bildesøk</h2>
      <div className="image-search-form">
        <input type="text" value={query.query} onChange={(evt) => onQueryChange(evt)} placeholder={polyglot.t('welcomePage.placeholder')} className="image-search-form_query" />
        <button className="image-search-form_btn" onClick={(evt) => onSubmit(evt, query)}><Icon.Search /></button>
      </div>
      <div className="image-search_border" />
    </div>
  );
}

ImageSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  localChangeImageSearchQuery: PropTypes.func.isRequired
};
