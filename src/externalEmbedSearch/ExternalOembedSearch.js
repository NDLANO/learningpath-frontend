/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import EmbedSearchForm from '../embedSearch/EmbedSearchForm';
import * as actions from '../embedSearch/embedSearchActions';
import ExternalOembedPreview from './ExternalOembedPreview';
import { getEmbedResultFromState, getEmbedQueryFromState, getOembedContentFromState } from '../embedSearch/embedSearchSelectors';
import polyglot from '../i18n';
import EmbedSearchResult from '../embedSearch/EmbedSearchResult';
import EmbedSearchPager from '../embedSearch/EmbedSearchPager';

const searchType = 'external';

class ExternalOembedSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      oembedDisplay: false,
      textQuery: props.query.textQuery,
    };
    this.previewOembed = this.previewOembed.bind(this);
    this.onPreviewClose = this.onPreviewClose.bind(this);
    this.handleTextQueryChange = this.handleTextQueryChange.bind(this);
  }
  componentWillMount() {
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
  handleTextQueryChange(evt) {
    this.setState({ textQuery: evt.target.value });
  }

  render() {
    const { result, localFetchEmbedSearch, oembedPreview, query, addEmbedResult } = this.props;
    const oembed = oembedPreview ? <ExternalOembedPreview oembedPreview={oembedPreview} oembedDisplay={this.state.oembedDisplay} onPreviewboxClose={this.onPreviewClose} /> : '';
    const resultItems = get(result, 'items', []);
    return (
      <div className="embed-search_container embed-search_container--active">
        <h4>{polyglot.t('embedSearch.form.externalTitle')}</h4>
        <EmbedSearchForm
          query={query}
          handleTextQueryChange={this.handleTextQueryChange}
          localFetchEmbedSearch={localFetchEmbedSearch}
          textQuery={this.state.textQuery}
          searchType={searchType}
        />
        <div className="embed-search_results">
          {resultItems.map(item =>
            <div key={item.cacheId} >
              <EmbedSearchResult item={item} onPreviewClick={this.previewOembed} addEmbedResult={addEmbedResult} />
              {oembedPreview && oembedPreview.url === item.link ? oembed : ''}
            </div>
          )}
          <EmbedSearchPager query={query} pagerAction={localFetchEmbedSearch} />
        </div>
      </div>
    );
  }
}

ExternalOembedSearch.propTypes = {
  localFetchEmbedSearch: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  localFetchOembed: PropTypes.func.isRequired,
  oembedPreview: PropTypes.object,
  removeOembed: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  localChangeEmbedSearchQuery: PropTypes.func.isRequired,
  addEmbedResult: PropTypes.func.isRequired,
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

const mapStateToProps = state => Object.assign({}, state, {
  result: getEmbedResultFromState(state, searchType),
  query: getEmbedQueryFromState(state, searchType),
  oembedPreview: getOembedContentFromState(state, searchType),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExternalOembedSearch);
