import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import LabeledIcon from './LabeledIcon';
import SearchResultPager from './SearchResultPager';

import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';

import {fetchLearningPaths } from '../actions';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';

import polyglot from '../i18n';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
      sort: props.sort
    };
  }

  handleSortChange(evt) {
    this.setState({sort: evt.target.value}, () => {
      this.props.onSortOrderChange(this.state.sort);
    });
  }

  handleQueryChange(evt) {
    this.setState({query: evt.target.value});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSearchQuerySubmit(this.state.query);
  }

  render() {
    const handleSortChange = this.handleSortChange.bind(this);
    const handleQueryChange = this.handleQueryChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <form onSubmit={handleSubmit}
        className='search-form search-form--on-dark'
    >

        <input type="text" className="search-form_query"
          onChange={handleQueryChange}
          value={this.state.query}
          placeholder={polyglot.t('searchForm.placeholder')}
    />

        <button className="search-form_btn">{polyglot.t('searchForm.btn')}</button>

        <select className="search-form_sort-order"
          onChange={handleSortChange}
          value={this.state.sort}
    >
          <option value="relevance">{polyglot.t('searchForm.order.relevance')}</option>
          <option value="-lastUpdated">{polyglot.t('searchForm.order.newest')}</option>
          <option value="lastUpdated">{polyglot.t('searchForm.order.oldest')}</option>
          <option value="-duration">{polyglot.t('searchForm.order.longest')}</option>
          <option value="duration">{polyglot.t('searchForm.order.shortest')}</option>
          <option value="title">{polyglot.t('searchForm.order.title')}</option>
        </select>
      </form>
    );
  }
}

SearchForm.propTypes = {
  sort: PropTypes.string,
  query: PropTypes.string,
  onSearchQuerySubmit: PropTypes.func.isRequired,
  onSortOrderChange: PropTypes.func.isRequired
};

SearchForm.defaultProps = {
  sort: '-lastUpdated', query: ''
};



export class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {imageError: false};
    this.handleImageError = this.handleImageError.bind(this);
  }

  handleImageError() {
    this.setState({imageError: true});
  }

  render() {

    const { path } = this.props;
    const { lang } = this.context;
    const image = () => {
      if (path.coverPhotoUrl && !this.state.imageError) {
        return <img className="search-result_img" src={path.coverPhotoUrl} onError={this.handleImageError} />;
      } else {
        return <img className="search-result_img" src={'https://placeholdit.imgix.net/~text?txtsize=33&txt=NDLA&w=190&h=120'} />;
      }
    };

    return (

      <div>
        <Link to={`/learningpaths/${path.id}`}>
          <div className="search-result">
            <div className="search-result_img_container">
              {image()}
            </div>
            <div className="search-result_bd">
              <h2 className="search-result_title">
                {titleI18N(path, lang)}
              </h2>
              <div className="search-result_meta">
                <LabeledIcon.Person labelText={get(path, 'author.name')} />
                <LabeledIcon.Today labelText={formatDate(path.lastUpdated, lang)} tagName="time" />
                <LabeledIcon.QueryBuilder labelText={formatDuration(path.duration, lang)} tagName="time" />
              </div>
              <div className="search-result_description">{descriptionI18N(path, lang)}</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

SearchResult.propTypes = {
  path: PropTypes.object.isRequired
};

SearchResult.contextTypes = {
  lang: PropTypes.string.isRequired
};

export class LearningPathSearch extends Component {


  componentWillMount() {
    this.props.fetchLearningPaths();
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(newProps.query, this.props.query)) {
      newProps.fetchLearningPaths();
    }
  }


  render() {
    const { learningPaths, query, lastPage, location: { pathname }, pushRoute } = this.props;
    let { page } = query;

    const navigateTo = (q) => {
      pushRoute({pathname, query: q});
    };

    const submitSearchQuery = q => navigateTo(Object.assign({}, query, { query: q, page: 1 }));

    const changeSortOrder = sort => navigateTo(Object.assign({}, query, { sort }));

    return (
      <div>
        <div className="page-header">
          <SearchForm
            {...query}
            onSortOrderChange={changeSortOrder}
            onSearchQuerySubmit={submitSearchQuery}
          />
        </div>

        <div className="search-results">
          {learningPaths.map(path =>
            (<SearchResult key={path.id} path={path} />)
          )}
          <SearchResultPager page={page} lastPage={lastPage} query={query} />
        </div>
      </div>
    );
  }
}

LearningPathSearch.propTypes = {
  fetchLearningPaths: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  learningPaths: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
  lastPage: PropTypes.number.isRequired,
  pushRoute: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  let query = state.learningPathQuery;
  let lastPage = Math.ceil(state.learningPathsTotalCount / (query.pageSize || 1));
  return Object.assign({}, state, { query, lastPage });
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchLearningPaths,
  pushRoute: (route) => routerActions.push(route)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathSearch);
