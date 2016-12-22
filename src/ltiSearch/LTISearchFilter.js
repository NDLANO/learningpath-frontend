/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

class LTISearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: undefined,
    };

    this.handleLTIFilterChange = this.handleLTIFilterChange.bind(this);
  }

  handleLTIFilterChange(evt, filter) {
    console.log('YO');
    evt.preventDefault();
    if (filter) {
      this.setState({ filter: filter.key });
      this.props.onFilterClick(filter);
    } else {
      this.setState({ filter });
      this.props.onFilterClick(filter);
    }
  }


  render() {
    const filters = [
      {
        key: 'khan_academy',
        name: 'Khan academy',
        extra_args: {
          ext_content_return_url: window.location.href,
          ext_content_return_types: 'oembed,lti_launch_url,url,image_url',
          ext_content_intended_use: 'embed',
        },
      },
      {
        key: 'youtube',
        name: 'Youtube',
        extra_args: {
          ext_content_return_url: window.location.href,
          ext_content_return_types: 'oembed,lti_launch_url,url,image_url',
          ext_content_intended_use: 'embed',
        },
      },
      {
        key: 'quizlet',
        name: 'Quizlet',
        extra_args: {
          ext_content_return_url: window.location.href,
          ext_content_return_types: 'oembed,lti_launch_url,url,image_url',
          ext_content_intended_use: 'embed',
        },
      },
      {
        key: 'youtube_ted_ed',
        name: 'Ted',
        extra_args: {
          ext_content_return_url: window.location.href,
          ext_content_return_types: 'oembed,lti_launch_url,url,image_url',
          ext_content_intended_use: 'embed',
        },
      },
    ];
    const filterClass = filter => classNames({
      'un-button': true,
      'lti-search_form-filter ': true,
      'lti-search_form-filter--active': this.state.filter === filter,
    });

    return (
      <div className="lti-search_form-filters">
        <button onClick={evt => this.handleLTIFilterChange(evt, undefined)} className={filterClass(undefined)}>Ingen</button>
        {filters.map(filter =>
          <button key={filter.key} className={filterClass(filter.key)} onClick={evt => this.handleLTIFilterChange(evt, filter)}>{filter.name}</button>
        )}
      </div>
    );
  }
}

LTISearchFilter.propTypes = {
  onFilterClick: PropTypes.func.isRequired,

};
export default LTISearchFilter;
