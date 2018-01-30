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
import classNames from 'classnames';
import EmbedSearchForm from '../embedSearch/EmbedSearchForm';
import * as actions from '../embedSearch/embedSearchActions';
import EmbedSearchResults from '../embedSearch/EmbedSearchResults';
import EmbedSearchPreview from '../embedSearch/EmbedSearchPreview';
import {
  getEmbedResultFromState,
  getEmbedQueryFromState,
  getOembedContentFromState,
} from '../embedSearch/embedSearchSelectors';
import polyglot from '../i18n';
import { fetchArticleSearch} from './articleActions';
import { getArticleResultFromState } from './articleSelectors';

const searchType = 'ndla';

class NdlaEmbedSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      oembedDisplay: false,
      textQuery: props.query.textQuery,
    };
    this.previewOembed = this.previewOembed.bind(this);
    this.addEmbedResult = this.addEmbedResult.bind(this);
    this.handleTextQueryChange = this.handleTextQueryChange.bind(this);
    this.onImageLightboxClose = this.onImageLightboxClose.bind(this);
  }
  componentWillMount() {
    this.props.articleSearch(this.props.query, 'ndla');
  }

  onImageLightboxClose() {
    this.props.removeOembed({ type: 'ndla' });
    this.setState({ oembedDisplay: false });
  }

  previewOembed(evt, item) {
    evt.preventDefault();
    this.props.localFetchOembed(item.link, this.context.lang, searchType);
    this.setState({ oembedDisplay: true });
  }
  addEmbedResult(evt, url) {
    evt.preventDefault();
    this.props.urlOnBlur(url, 'oembed');
    this.props.toggleNdlaDisplay(evt);
  }
  handleTextQueryChange(evt) {
    this.setState({ textQuery: evt.target.value });
  }

  render() {
    const {
      results,
      localFetchEmbedSearch,
      oembedPreview,
      query,
      display,
      articleSearch,
    } = this.props;
    const containerClass = {
      'embed-search_container': true,
      'embed-search_container--active': display,
    };

    return (
      <div>
        <div className={classNames(containerClass)}>
          <h4>{polyglot.t('embedSearch.form.ndlaTitle')}</h4>
          <p>hei</p>
          <EmbedSearchForm
            query={query}
            handleTextQueryChange={this.handleTextQueryChange}
            localFetchEmbedSearch={articleSearch}
            textQuery={this.state.textQuery}
            type="ndla"
          />
          <EmbedSearchResults
            items={results}
            onPreviewClick={this.previewOembed}
            addEmbedResult={this.addEmbedResult}
            pagerAction={articleSearch}
            query={query}
          />
          <EmbedSearchPreview
            oembedPreview={oembedPreview}
            oembedDisplay={this.state.oembedDisplay}
            onImageLightboxClose={this.onImageLightboxClose}
          />
        </div>
      </div>
    );
  }
}

NdlaEmbedSearch.propTypes = {
  localFetchEmbedSearch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  localFetchOembed: PropTypes.func.isRequired,
  oembedPreview: PropTypes.object,
  removeOembed: PropTypes.func.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  localChangeEmbedSearchQuery: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
  toggleNdlaDisplay: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  localFetchEmbedSearch: actions.fetchNdlaEmbedSearch,
  localFetchOembed: actions.fetchNdlaOembed,
  removeOembed: actions.removeEmbedPreview,
  localChangeEmbedSearchQuery: actions.changeEmbedSearchQuery,
  articleSearch: fetchArticleSearch,
};

const mapStateToProps = state =>
  Object.assign({}, state, {
    results: getArticleResultFromState(state),
    query: getEmbedQueryFromState(state, searchType),
    oembedPreview: getOembedContentFromState(state, searchType),
  });

export default connect(mapStateToProps, mapDispatchToProps)(NdlaEmbedSearch);
