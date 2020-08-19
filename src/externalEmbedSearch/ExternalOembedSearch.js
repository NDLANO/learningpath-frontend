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
import EmbedSearchForm from '../embedSearch/EmbedSearchForm';
import * as actions from '../embedSearch/embedSearchActions';
import ExternalOembedPreview from './ExternalOembedPreview';
import {
  getEmbedResultFromState,
  getEmbedQueryFromState,
  getOembedContentFromState,
} from '../embedSearch/embedSearchSelectors';
import polyglot from '../i18n';
import EmbedSearchResult from '../embedSearch/EmbedSearchResult';
import EmbedSearchPager from '../embedSearch/EmbedSearchPager';

const searchType = 'external';

class ExternalOembedSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oembedDisplay: false,
    };
    this.previewOembed = this.previewOembed.bind(this);
    this.onPreviewClose = this.onPreviewClose.bind(this);
  }

  componentDidMount() {
    this.props.localFetchEmbedSearch(this.props.query);
  }

  onPreviewClose(evt) {
    evt.preventDefault();
    this.props.removeOembed({ type: 'external' });
    this.setState({ oembedDisplay: false });
  }

  previewOembed(evt, item) {
    evt.preventDefault();
    this.props.localFetchOembed(item.link, this.context.lang, searchType);
    this.setState({ oembedDisplay: true });
  }

  render() {
    const {
      results,
      localFetchEmbedSearch,
      oembedPreview,
      query,
      addEmbedResult,
      handleTextQueryChange,
      textQuery,
    } = this.props;
    const oembed = oembedPreview ? (
      <ExternalOembedPreview
        oembedPreview={oembedPreview}
        oembedDisplay={this.state.oembedDisplay}
        onPreviewboxClose={this.onPreviewClose}
      />
    ) : (
      ''
    );
    const emptyResult = results.length === 0;
    return (
      <div className="embed-search_container embed-search_container--active">
        <h4>{polyglot.t('embedSearch.form.externalTitle')}</h4>
        <EmbedSearchForm
          query={query}
          handleTextQueryChange={handleTextQueryChange}
          localFetchEmbedSearch={localFetchEmbedSearch}
          textQuery={textQuery}
          searchType={searchType}
        />

        <div className="embed-search_results">
          {!emptyResult ? (
            results.map(item => (
              <div key={item.id}>
                <EmbedSearchResult
                  item={item}
                  onPreviewClick={this.previewOembed}
                  addEmbedResult={addEmbedResult}
                />
                {oembedPreview && oembedPreview.url === item.link ? oembed : ''}
              </div>
            ))
          ) : (
            <p>{polyglot.t('embedSearch.results.noResults')}</p>
          )}
          <EmbedSearchPager query={query} pagerAction={localFetchEmbedSearch} />
        </div>
      </div>
    );
  }
}

ExternalOembedSearch.propTypes = {
  localFetchEmbedSearch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  localFetchOembed: PropTypes.func.isRequired,
  oembedPreview: PropTypes.object,
  removeOembed: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  localChangeEmbedSearchQuery: PropTypes.func.isRequired,
  addEmbedResult: PropTypes.func.isRequired,
  handleTextQueryChange: PropTypes.func.isRequired,
  textQuery: PropTypes.string.isRequired,
};

ExternalOembedSearch.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  localFetchEmbedSearch: actions.fetchExternalEmbedSearch,
  localFetchOembed: actions.fetchExternalOembed,
  removeOembed: actions.removeEmbedPreview,
  localChangeEmbedSearchQuery: actions.changeEmbedSearchQuery,
};

const mapStateToProps = state =>
  Object.assign({}, state, {
    results: getEmbedResultFromState(state, searchType),
    query: getEmbedQueryFromState(state, searchType),
    oembedPreview: getOembedContentFromState(state, searchType),
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExternalOembedSearch);
