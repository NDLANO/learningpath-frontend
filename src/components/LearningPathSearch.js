import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import get from 'lodash/get';
import Icon from './Icon';

import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';

import {fetchLearningPaths, changeLearningPathQuery} from '../actions';
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
          className='search-form search-form--dark'>

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

function SearchResult ({path, lang}) {
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
          <span className='search-result_author'>
            <Icon.Person className='icon--gray' />
            <a rel='author' href='#'>{get(path, 'author.name')}</a>
          </span>

          <span className='search-result_changed-date'>
            <Icon.Today className='icon--gray' />
            <time>{formatDate(path.lastUpdated, lang)}</time>
          </span>

          <span className='search-result_duration'>
            <Icon.QueryBuilder className='icon--gray' />
            <time>{formatDuration(path.duration, lang)}</time>
          </span>
        </div>
        <div className='search-result_description'
          dangerouslySetInnerHTML={{__html: descriptionI18N(path, lang)}}></div>
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  path: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

export function LearningPathSearch(props) {
  const {learningPaths, learningPathQuery, lang, location:{pathname}, dispatch} = props;

  const navigateTo = query => {
    dispatch(changeLearningPathQuery(query));
    dispatch(fetchLearningPaths());
    dispatch(routeActions.push({pathname: pathname, query}));
  };

  const submitSearchQuery = query => navigateTo(Object.assign({},
        learningPathQuery,
        { query, page: 1 }));

  const changeSortOrder = sort => navigateTo(Object.assign({},
        learningPathQuery,
        { sort }));

  return (
    <div>
      <div className='page-header'>
        <SearchForm
          {...learningPathQuery}
          onSortOrderChange={changeSortOrder}
          onSearchQuerySubmit={submitSearchQuery}
        />
      </div>

      <div className='search-results'>
        {learningPaths.map(path =>
          (<SearchResult key={path.id} path={path} lang={lang} />)
        )}
      </div>
    </div>
  );
}

export default connect(state => state)(LearningPathSearch);
