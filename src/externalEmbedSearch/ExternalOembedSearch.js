import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import get from 'lodash/get';
import EmbedSearchForm from '../embedSearch/EmbedSearchForm';
import * as actions from '../embedSearch/embedSearchActions';
import EmbedSearchResults from '../embedSearch/EmbedSearchResults';
import ExternalOembedPreview from './ExternalOembedPreview';
import { getEmbedResultFromState, getEmbedQueryFromState, getOembedContentFromState } from '../embedSearch/embedSearchSelectors';
import polyglot from '../i18n';

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
  onPreviewClose() {
    this.props.removeOembed();
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
    const { lang: language } = this.context;
    const containerClass = {
      'embed-search_container': true,
      'embed-search_container--active': this.state.active,
    };
    console.log(oembedPreview);
    const oembedComponent = <ExternalOembedPreview oembedPreview={oembedPreview} oembedDisplay={this.state.oembedDisplay} onPreviewboxClose={this.onPreviewClose} />;
    const resultItems = get(result, 'items', []);
    return (
      <div>
        <h4>Legg til innhold fra NDLA</h4>
        <EmbedSearchForm
          query={query}
          handleTextQueryChange={this.handleTextQueryChange}
          localFetchEmbedSearch={localFetchEmbedSearch}
          textQuery={this.state.textQuery}
          searchType={searchType}
        />
        <EmbedSearchResults
          items={resultItems}
          onPreviewClick={this.previewOembed}
          addEmbedResult={addEmbedResult}
          pagerAction={localFetchEmbedSearch}
          query={query}
          searchType={searchType}
          oembedComponent={oembedComponent}
        />


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
  urlOnBlur: PropTypes.func.isRequired,
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
