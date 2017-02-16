/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ExternalEmbedSearchFilter from './ExternalEmbedSearchFilter';
import ExternalEmbedSearchContainer from './ExternalEmbedSearchContainer';
import Lightbox from '../common/Lightbox';
import * as actions from '../embedSearch/embedSearchActions';
import { getEmbedResultFromState, getEmbedQueryFromState, getOembedContentFromState } from '../embedSearch/embedSearchSelectors';
import polyglot from '../i18n';

class ExternalEmbedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      filter: props.query.filter,

    };
    this.displayExternalSearch = this.displayExternalSearch.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.closeExternalSearch = this.closeExternalSearch.bind(this);
    this.addEmbedResult = this.addEmbedResult.bind(this);
  }
  onFilterChange(evt, filter) {
    evt.preventDefault();
    this.setState({ filter });
    if (filter.type === 'oembed') {
      this.props.localFetchEmbedSearch(Object.assign({}, this.props.query, { filter, textQuery: '' }));
    }
  }

  addEmbedResult(evt, url) {
    evt.preventDefault();
    this.props.urlOnBlur(url, this.state.filter.type);
    this.setState({ active: false });
  }

  displayExternalSearch(evt) {
    evt.preventDefault();
    this.setState({ active: true });
  }
  closeExternalSearch() {
    this.setState({ active: false });
    this.props.removeOembed({ type: 'external' });
  }

  render() {
    const { learningPathId, stepId } = this.props;

    return (
      <div>
        <button className="button button--primary button--block embed-search_open-button" onClick={this.displayExternalSearch}>
          {polyglot.t('embedSearch.externalButton')}
        </button>
        <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll">
          <Lightbox display={this.state.active} onClose={this.closeExternalSearch}>
            <ExternalEmbedSearchFilter currentFilter={this.state.filter} onFilterChange={this.onFilterChange} learningPathId={learningPathId} stepId={stepId} />
            <ExternalEmbedSearchContainer
              currentFilter={this.state.filter}
              learningPathId={learningPathId}
              addEmbedResult={this.addEmbedResult}
            />
          </Lightbox>
        </div>
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
};
const mapStateToProps = state => Object.assign({}, state, {
  result: getEmbedResultFromState(state, 'external'),
  query: getEmbedQueryFromState(state, 'external'),
  oembedPreview: getOembedContentFromState(state, 'external'),
});
const mapDispatchToProps = {
  localFetchEmbedSearch: actions.fetchExternalEmbedSearch,
  removeOembed: actions.removeEmbedPreview,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalEmbedSearch);
