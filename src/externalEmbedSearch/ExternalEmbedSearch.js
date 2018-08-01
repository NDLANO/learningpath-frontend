/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExternalEmbedSearchFilter from './ExternalEmbedSearchFilter';
import ExternalEmbedSearchContainer from './ExternalEmbedSearchContainer';
import Lightbox from '../common/Lightbox';
import * as actions from '../embedSearch/embedSearchActions';
import {
  getEmbedResultFromState,
  getEmbedQueryFromState,
  getOembedContentFromState,
} from '../embedSearch/embedSearchSelectors';

class ExternalEmbedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.query,
      filter: props.query.filter,
      textQuery: props.query.textQuery,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.addEmbedResult = this.addEmbedResult.bind(this);
    this.handleTextQueryChange = this.handleTextQueryChange.bind(this);
  }

  componentWillMount() {
    if (this.state.filter.type === 'oembed') {
      this.props.localFetchEmbedSearch(
        Object.assign({}, this.props.query, {
          page: 1,
          start: 1,
          filter: this.state.filter,
          textQuery: '',
        }),
      );
    }
  }

  onFilterChange(evt, filter) {
    evt.preventDefault();
    this.setState({ filter, textQuery: '' });
    if (filter.type === 'oembed') {
      this.props.localFetchEmbedSearch(
        Object.assign({}, this.props.query, {
          page: 1,
          start: 1,
          filter,
          textQuery: '',
        }),
      );
    }
  }

  handleTextQueryChange(evt) {
    this.setState({ textQuery: evt.target.value });
  }

  addEmbedResult(evt, url) {
    evt.preventDefault();
    this.props.urlOnBlur(url, this.state.filter.type);
    this.props.handleDisplayClose();
  }

  render() {
    const { learningPathId, stepId, handleDisplayClose, display } = this.props;
    return (
      <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll">
        <Lightbox display={display} onClose={handleDisplayClose}>
          <ExternalEmbedSearchFilter
            currentFilter={this.state.filter}
            onFilterChange={this.onFilterChange}
            learningPathId={learningPathId}
            stepId={stepId}
          />
          <ExternalEmbedSearchContainer
            currentFilter={this.state.filter}
            learningPathId={learningPathId}
            addEmbedResult={this.addEmbedResult}
            textQuery={this.state.textQuery}
            handleTextQueryChange={this.handleTextQueryChange}
          />
        </Lightbox>
      </div>
    );
  }
}

ExternalEmbedSearch.propTypes = {
  learningPathId: PropTypes.number.isRequired,
  stepId: PropTypes.number,
  urlOnBlur: PropTypes.func.isRequired,
  localFetchEmbedSearch: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  removeOembed: PropTypes.func.isRequired,
  handleDisplayClose: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
};
const mapStateToProps = state =>
  Object.assign({}, state, {
    result: getEmbedResultFromState(state, 'external'),
    query: getEmbedQueryFromState(state, 'external'),
    oembedPreview: getOembedContentFromState(state, 'external'),
  });
const mapDispatchToProps = {
  localFetchEmbedSearch: actions.fetchExternalEmbedSearch,
  removeOembed: actions.removeEmbedPreview,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExternalEmbedSearch);
