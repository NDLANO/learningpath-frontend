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
import { fetchEmbedSearch, fetchOembed, removeEmbedPreview } from './embedSearchActions';
import EmbedSearchResults from './EmbedSearchResults';
import EmbedSearchForm from './EmbedSearchForm';
import Lightbox from '../common/Lightbox';
import Oembed from '../learningPath/step/oembed/Oembed';
import { oembedContentI18N } from '../util/i18nFieldFinder';

class EmbedSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [
        { name: 'Alle', key: '' },
        { name: 'Youtube', key: 'more:youtube' },
        { name: 'NDLA', key: 'more:ndla' },
      ],
      active: false,
      queryString: '',
      oembedDisplay: false,
    };
    this.toggleGoogleCustomSearch = this.toggleGoogleCustomSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.previewOembed = this.previewOembed.bind(this);
    this.onImageLightboxClose = this.onImageLightboxClose.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.addEmbedResult = this.addEmbedResult.bind(this);
  }
  onImageLightboxClose() {
    this.props.removeOembed();
    this.setState({ oembedDisplay: false });
  }
  toggleGoogleCustomSearch(evt) {
    evt.preventDefault();
    this.setState({ active: !this.state.active });
  }
  handleQueryChange(evt) {
    this.setState({ queryString: evt.target.value });
  }
  previewOembed(evt, item) {
    evt.preventDefault();
    this.props.localFetchOembed(item.link, this.context.lang);
    this.setState({ oembedDisplay: true });
  }
  handleFilterChange(evt, filter) {
    evt.preventDefault();
    this.props.localFetchEmbedSearch(Object.assign({}, this.props.query, filter));
  }
  addEmbedResult(evt, item) {
    evt.preventDefault();
    this.props.urlOnBlur(item.link);
    this.setState({ active: false });
  }


  render() {
    const { result, localFetchEmbedSearch, oembedPreview, query } = this.props;
    const { lang: language } = this.context;
    const containerClass = {
      'google-custom-search_container': true,
      'google-custom-search_container--active': this.state.active,
    };
    const resultItems = get(result, 'items', []);
    const embedContent = oembedPreview ? oembedContentI18N({ embedUrl: oembedPreview }, language) : oembedPreview;

    return (
      <div>
        <button className="button button--primary button--block" onClick={this.toggleGoogleCustomSearch}>Google Custom Search</button>
        <div className={classNames(containerClass)}>
          <EmbedSearchForm
            filters={this.state.filters}
            query={query}
            handleQueryChange={this.handleQueryChange}
            localFetchEmbedSearch={localFetchEmbedSearch}
            onFilterClick={this.handleFilterChange}
          />
          <EmbedSearchResults
            items={resultItems}
            onPreviewClick={this.previewOembed}
            addEmbedResult={this.addEmbedResult}
            pagerAction={localFetchEmbedSearch}
            query={query}
          />
          <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll big-lightbox_wrapper--center">
            <Lightbox display={this.state.oembedDisplay} onClose={this.onImageLightboxClose}>
              <Oembed oembedContent={embedContent} />
            </Lightbox>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  localFetchEmbedSearch: fetchEmbedSearch,
  localFetchOembed: fetchOembed,
  removeOembed: removeEmbedPreview,
};

const mapStateToProps = state => Object.assign({}, state, {
  result: state.embedSearch.result,
  query: state.embedSearch.query,
  oembedPreview: state.embedSearch.oembedContent,
});

EmbedSearch.propTypes = {
  localFetchEmbedSearch: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  localFetchOembed: PropTypes.func.isRequired,
  oembedPreview: PropTypes.array,
  removeOembed: PropTypes.func.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
};

EmbedSearch.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmbedSearch);
