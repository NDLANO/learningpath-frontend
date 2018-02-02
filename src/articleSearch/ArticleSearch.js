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
  getEmbedQueryFromState,
  getOembedContentFromState,
} from '../embedSearch/embedSearchSelectors';
import polyglot from '../i18n';
import { fetchArticleSearch } from './articleActions';
import { getArticleResultFromState } from './articleSelectors';
import { getLocale } from '../locale/localeSelectors';

const searchType = 'ndla';

class ArticleSearch extends React.Component {
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
    this.props.articleSearch(this.props.query, this.props.language);
  }

  onImageLightboxClose() {
    this.props.removeOembed({ type: searchType });
    this.setState({ oembedDisplay: false });
  }

  async previewOembed(evt, item) {
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
      oembedPreview,
      query,
      display,
      articleSearch,
      language,
    } = this.props;
    const containerClass = {
      'embed-search_container': true,
      'embed-search_container--active': display,
    };

    return (
      <div>
        <div className={classNames(containerClass)}>
          <h4>{polyglot.t('embedSearch.form.ndlaTitle')}</h4>
          <EmbedSearchForm
            query={query}
            handleTextQueryChange={this.handleTextQueryChange}
            localFetchEmbedSearch={q => articleSearch(q, language)}
            textQuery={this.state.textQuery}
          />
          <EmbedSearchResults
            items={results}
            onPreviewClick={this.previewOembed}
            addEmbedResult={this.addEmbedResult}
            pagerAction={q => articleSearch(q, language)}
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

ArticleSearch.propTypes = {
  articleSearch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  localFetchOembed: PropTypes.func.isRequired,
  oembedPreview: PropTypes.object,
  removeOembed: PropTypes.func.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  localChangeEmbedSearchQuery: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  toggleNdlaDisplay: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
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
    language: getLocale(state),
  });

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearch);
