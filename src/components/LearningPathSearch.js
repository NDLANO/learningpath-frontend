import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import LabeledIcon from './LabeledIcon';
import SearchResultPager from './SearchResultPager';

import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';

import {fetchLearningPaths } from '../actions';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';


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
          className='search-form search-form--on-dark'>

        <input type='text' className='search-form_query'
            onChange={handleQueryChange}
            value={this.state.query}
            placeholder='Søk etter læringsstier' />

        <button className='search-form_btn'>Søk</button>

        <select className='search-form_sort-order'
            onChange={handleSortChange}
            value={this.state.sort}>
          <option value='relevance'>Relevans</option>
          <option value='-lastUpdated'>Nyeste</option>
          <option value='lastUpdated'>Eldste</option>
          <option value='-duration'>Lengste</option>
          <option value='duration'>Korteste</option>
          <option value='title'>Alfabetisk</option>
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

function SearchResult ({path}, {lang}) {
  return (
    <div className='search-result'>
      {(() => path.coverPhotoUrl ?
        (<img className='search-result_img' src={path.coverPhotoUrl} />) : ''
      )()}
      <div className='search-result_bd'>
        <h2 className='search-result_title'>
          <Link to={`/learningpaths/${path.id}`}>{titleI18N(path, lang)}</Link>
        </h2>
        <div className='search-result_meta'>
          <LabeledIcon.Person labelText={get(path, 'author.name')} />
          <LabeledIcon.Today labelText={formatDate(path.lastUpdated, lang)} tagName='time' />
          <LabeledIcon.QueryBuilder labelText={formatDuration(path.duration, lang)} tagName='time' />
        </div>
        <div className='search-result_description'>{descriptionI18N(path, lang)}</div>
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  path: PropTypes.object.isRequired
};

SearchResult.contextTypes = {
  lang: PropTypes.string.isRequired
};

export class LearningPathSearch extends Component {

  componentWillMount () {
    this.props.fetchLearningPaths();
  }

  componentWillReceiveProps (newProps) {
    if (!isEqual(newProps.query, this.props.query)) {
      newProps.fetchLearningPaths();
    }
  }

  render () {
    const { learningPaths, query, lastPage, location: { pathname }, pushRoute } = this.props;
    let { page } = query;

    const navigateTo = (q) => {
      pushRoute({pathname, query: q});
    };

    const submitSearchQuery = q => navigateTo(Object.assign({}, query, { query: q, page: 1 }));

    const changeSortOrder = sort => navigateTo(Object.assign({}, query, { sort }));

    return (
      <div>
        <div className='page-header'>
          <SearchForm {...query}
            onSortOrderChange={changeSortOrder}
            onSearchQuerySubmit={submitSearchQuery}
          />
        </div>

        <div className='search-results'>
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
  pushRoute: (route) => routeActions.push(route)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathSearch);
