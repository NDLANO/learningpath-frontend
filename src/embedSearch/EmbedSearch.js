/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { fetchEmbedSearch, fetchOembed, removeEmbedPreview, changeEmbedSearchQuery } from './embedSearchActions';
import EmbedSearchResults from './EmbedSearchResults';
import EmbedSearchForm from './EmbedSearchForm';
import EmbedSearchPreview from './EmbedSearchPreview';
import { getEmbedResultFromState, getEmbedQueryFromState, getOembedContentFromState } from './embedSearchSelectors';
import polyglot from '../i18n';

class EmbedSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      oembedDisplay: false,
      textQuery: props.query.textQuery,
    };
    this.toggleGoogleCustomSearch = this.toggleGoogleCustomSearch.bind(this);
    this.previewOembed = this.previewOembed.bind(this);
    this.onImageLightboxClose = this.onImageLightboxClose.bind(this);
    this.addEmbedResult = this.addEmbedResult.bind(this);
    this.handleTextQueryChange = this.handleTextQueryChange.bind(this);
  }
  onImageLightboxClose() {
    this.props.removeOembed();
    this.setState({ oembedDisplay: false });
  }
  toggleGoogleCustomSearch(evt) {
    evt.preventDefault();
    this.setState({ active: !this.state.active });
  }
  previewOembed(evt, item) {
    evt.preventDefault();
    this.props.localFetchOembed(item.link, this.context.lang);
    this.setState({ oembedDisplay: true });
  }
  addEmbedResult(evt, item) {
    evt.preventDefault();
    this.props.urlOnBlur(item.link);
    this.setState({ active: false });
  }
  handleTextQueryChange(evt) {
    this.setState({ textQuery: evt.target.value });
  }


  render() {
    const { result, localFetchEmbedSearch, oembedPreview, query } = this.props;
    const { lang: language } = this.context;
    const containerClass = {
      'embed-search_container': true,
      'embed-search_container--active': this.state.active,
    };

    const resultItems = get(result, 'items', []);

    return (
      <div>
        <button className="button button--primary button--block" onClick={this.toggleGoogleCustomSearch}>{polyglot.t('embedSearch.button')}</button>
        <div className={classNames(containerClass)}>
          <EmbedSearchForm
            query={query}
            handleTextQueryChange={this.handleTextQueryChange}
            localFetchEmbedSearch={localFetchEmbedSearch}
            textQuery={this.state.textQuery}
          />
          <EmbedSearchResults
            items={resultItems}
            onPreviewClick={this.previewOembed}
            addEmbedResult={this.addEmbedResult}
            pagerAction={localFetchEmbedSearch}
            query={query}
          />
        <EmbedSearchPreview oembedPreview={oembedPreview} oembedDisplay={this.state.oembedDisplay} onImageLightboxClose={this.onImageLightboxClose} lang={language} />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  localFetchEmbedSearch: fetchEmbedSearch,
  localFetchOembed: fetchOembed,
  removeOembed: removeEmbedPreview,
  localChangeEmbedSearchQuery: changeEmbedSearchQuery,
};


const mapStateToProps = state => Object.assign({}, state, {
  result: getEmbedResultFromState(state),
  query: getEmbedQueryFromState(state),
  oembedPreview: getOembedContentFromState(state),
});

EmbedSearch.propTypes = {
  localFetchEmbedSearch: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  localFetchOembed: PropTypes.func.isRequired,
  oembedPreview: PropTypes.array,
  removeOembed: PropTypes.func.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  localChangeEmbedSearchQuery: PropTypes.func.isRequired,
};

EmbedSearch.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmbedSearch);
