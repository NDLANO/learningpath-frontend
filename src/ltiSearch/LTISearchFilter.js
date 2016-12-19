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

const EmbedSearchFilter = ({ query }) => {
  const filterClass = filter => classNames({
    'un-button': true,
    'embed-search_form-filter ': true,
    'embed-search_form-filter--active': query.filter === filter,
  });

  const handleFilterChange = (evt, filter) => {
    console.log(filter);
    evt.preventDefault();
  };

  const filters = [
    {
      khan: {
        key: 'khan',
        name: 'khan',
        launch_url: 'https://www.edu-apps.org/lti_public_resources/?tool_id=khan_academy',
        extra_args: {
          ext_content_return_url() { return window.location.href; },
          ext_content_return_types: 'oembed,lti_launch_url,url,image_url',
          ext_content_intended_use: 'embed',
        },
      },
    },
  ];
  return (
    <div className="embed-search_form-filters">
      {filters.map(filter =>
        <button key={filter.key} className={filterClass(filter.key)} onClick={evt => handleFilterChange(evt, filter)}>{filter.name}</button>
      )}
    </div>
  );
};

EmbedSearchFilter.propTypes = {
  query: PropTypes.object.isRequired,
};

export default EmbedSearchFilter;
