import React from 'react';
import polyglot from '../../i18n';
import Icon from '../../components/Icon';

export default function ImageSearch() {
  return (
    <div className="image-search">
      <h2>Bildesøk</h2>
      <div className="image-search-form">
        <input type="text" name="query" placeholder={polyglot.t('welcomePage.placeholder')} className="image-search-form_query" />
        <button type="submit" className="image-search-form_btn"><Icon.Search /></button>
      </div>
      <div className="image-search_border" />
    </div>
  );
}

ImageSearch.propTypes = {

};
