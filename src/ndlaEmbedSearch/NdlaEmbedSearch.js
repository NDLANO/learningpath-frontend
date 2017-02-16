import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import get from 'lodash/get';
import EmbedSearchForm from '../embedSearch/EmbedSearchForm';
import * as actions from '../embedSearch/embedSearchActions';
import EmbedSearchResults from '../embedSearch/EmbedSearchResults';
import EmbedSearchPreview from '../embedSearch/EmbedSearchPreview';
import { getEmbedResultFromState, getEmbedQueryFromState, getOembedContentFromState } from '../embedSearch/embedSearchSelectors';
import polyglot from '../i18n';

const searchType = 'ndla';

class NdlaEmbedSearch extends React.Component {
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
  componentWillMount() {
    this.props.localFetchEmbedSearch(this.props.query, 'ndla');
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
    this.props.localFetchOembed(item.link, this.context.lang, searchType);
    this.setState({ oembedDisplay: true });
  }
  addEmbedResult(evt, url) {
    evt.preventDefault();
    this.props.urlOnBlur(url, 'oembed');
    this.setState({ active: false });
  }
  handleTextQueryChange(evt) {
    this.setState({ textQuery: evt.target.value });
  }

  render() {
    const { result, localFetchEmbedSearch, oembedPreview, query } = this.props;
    const containerClass = {
      'embed-search_container': true,
      'embed-search_container--active': this.state.active,
    };

    const resultItems = get(result, 'items', []);

    return (
      <div>
        <button className="button button--primary button--block embed-search_open-button" onClick={this.toggleGoogleCustomSearch}>
          {polyglot.t('embedSearch.ndlaButton')}
        </button>
        <div className={classNames(containerClass)}>
          <h4>{polyglot.t('embedSearch.form.ndlaTitle')}</h4>
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
          <EmbedSearchPreview oembedPreview={oembedPreview} oembedDisplay={this.state.oembedDisplay} onImageLightboxClose={this.onImageLightboxClose} />
        </div>
      </div>
    );
  }
}

NdlaEmbedSearch.propTypes = {
  localFetchEmbedSearch: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  localFetchOembed: PropTypes.func.isRequired,
  oembedPreview: PropTypes.object,
  removeOembed: PropTypes.func.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  localChangeEmbedSearchQuery: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  localFetchEmbedSearch: actions.fetchNdlaEmbedSearch,
  localFetchOembed: actions.fetchNdlaOembed,
  removeOembed: actions.removeEmbedPreview,
  localChangeEmbedSearchQuery: actions.changeEmbedSearchQuery,
};

const mapStateToProps = state => Object.assign({}, state, {
  result: getEmbedResultFromState(state, searchType),
  query: getEmbedQueryFromState(state, searchType),
  oembedPreview: getOembedContentFromState(state, searchType),
});

export default connect(mapStateToProps, mapDispatchToProps)(NdlaEmbedSearch);
