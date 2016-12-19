/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import Icon from '../common/Icon';
import polyglot from '../i18n';
import LTISearchFilter from './LTISearchFilter';

const EmbedSearchForm = ({ query }) => {
  const onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      console.log('halla');
    }
  };

  return (
    <div className="embed-search_form">
      <h4>{polyglot.t('embedSearch.form.title')}</h4>
      <LTISearchFilter query={query} />
    </div>
  );
};

EmbedSearchForm.propTypes = {
  query: PropTypes.object.isRequired,
  textQuery: PropTypes.string.isRequired,
};

export default EmbedSearchForm;
