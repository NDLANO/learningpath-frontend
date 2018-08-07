/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class LTISearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'khan_academy',
      filters: [
        { key: 'khan_academy', name: 'Khan Academy' },
        { key: 'youtube', name: 'Youtube' },
        { key: 'quizlet', name: 'Quizlet' },
        { key: 'youtube_ted_ed', name: 'Ted' },
      ],
    };

    this.handleLTIFilterChange = this.handleLTIFilterChange.bind(this);
  }

  componentDidMount() {
    const { stepId, learningPathId } = this.props;
    const returnUrl = stepId
      ? `${window.location.origin}/lti/${learningPathId}/step/${stepId}`
      : `${window.location.origin}/lti/${learningPathId}/step/new`;
    const query = { key: 'khan_academy', returnUrl };
    this.props.onFilterClick(query);
  }

  handleLTIFilterChange(evt, filter) {
    evt.preventDefault();
    const { stepId, learningPathId } = this.props;
    const returnUrl = stepId
      ? `${window.location.origin}/lti/${learningPathId}/step/${stepId}`
      : `${window.location.origin}/lti/${learningPathId}/step/new`;
    const query = { ...filter, returnUrl };
    this.setState({ filter: filter.key });
    this.props.onFilterClick(query);
  }

  render() {
    const filterClass = filter =>
      classNames({
        'un-button': true,
        'lti-search_form-filter ': true,
        'lti-search_form-filter--active': this.state.filter === filter,
      });

    return (
      <div className="lti-search_form-filters">
        {this.state.filters.map(filter => (
          <button
            type="button"
            key={filter.key}
            className={filterClass(filter.key)}
            onClick={evt => this.handleLTIFilterChange(evt, filter)}>
            {filter.name}
          </button>
        ))}
      </div>
    );
  }
}

LTISearchFilter.propTypes = {
  onFilterClick: PropTypes.func.isRequired,
  stepId: PropTypes.number,
  learningPathId: PropTypes.number.isRequired,
};

export default LTISearchFilter;
