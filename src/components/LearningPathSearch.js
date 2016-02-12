import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import get from 'lodash/get';

import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';

import {fetchLearningPaths, changeLearningPathQuery} from '../actions';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';


class LearningPathSearchCtrl extends Component {
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
          className='one-column--third one-column__center search--layout'>

        <input type='text' className='input-search'
            onChange={handleQueryChange}
            value={this.state.query}
            placeholder='Søk etter læringsstier' />

        <button className='btn-search btn-search--negative'>Søk</button>

        <select className='search-filter'
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

LearningPathSearchCtrl.propTypes = {
  sort: PropTypes.string,
  query: PropTypes.string,
  onSearchQuerySubmit: PropTypes.func.isRequired,
  onSortOrderChange: PropTypes.func.isRequired
};

LearningPathSearchCtrl.defaultProps = {
  sort: '-lastUpdated', query: ''
};


function SearchResultTile ({path, lang}) {
  return (
    <div className='tile-vertical tile-vertical--shadowbox'>
      {(() => path.coverPhotoUrl ?
        (<img className='tile-vertical__img' src={path.coverPhotoUrl} />) : ''
      )()}
      <div className='tile-vertical__sorting'>
        <h2 className='tile-vertical__title'>
          <Link to={`/learningpaths/${path.id}`}>{titleI18N(path, lang)}</Link>
        </h2>
        <div className='search-list--meta'>

          <svg className='icon icon--person icon--gray icon__offset'>
            <use xlinkHref='/assets/symbol-defs.svg#icon-person' />
          </svg>
          <a rel='author' href='#'>{get(path, 'author.name')}</a>

          <svg className='icon icon--today icon--gray icon__offset'>
            <use xlinkHref='/assets/symbol-defs.svg#icon-today' />
          </svg>
          <time>{formatDate(path.lastUpdated, lang)}</time>

          <svg className='icon icon--query-builder icon--gray icon__offset'>
            <use xlinkHref='/assets/symbol-defs.svg#icon-query_builder' />
          </svg>
          <time>{formatDuration(path.duration, lang)}</time>
        </div>
        <div>
          {descriptionI18N(path, lang)}
        </div>
      </div>
    </div>
  );
}

SearchResultTile.propTypes = {
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
        <LearningPathSearchCtrl
          {...learningPathQuery}
          onSortOrderChange={changeSortOrder}
          onSearchQuerySubmit={submitSearchQuery}
        />
      </div>

      <div className='one-column--third'>
        {learningPaths.map(path =>
          (<SearchResultTile key={path.id} path={path} lang={lang} />)
        )}
      </div>
    </div>
  );
}

export default connect(state => state)(LearningPathSearch);
