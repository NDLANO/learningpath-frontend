import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import moment from 'moment';
import get from 'lodash/get';

import {fetchLearningPaths, changeLearningPathQuery} from '../actions';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';

const calcDuration = duration => duration < 60 ?
    duration + ' minutter' :
    Math.round(duration / 60) + ' timer';

export function LearningPathSearch(props) {
  const {learningPaths, learningPathQuery, lang, location, dispatch} = props;
  const sortBy = learningPathQuery.sort; 

  const changeSortOrder = (evt) => {
    let query = Object.assign({}, learningPathQuery, {
      sort: evt.target.value
    });

    dispatch(changeLearningPathQuery(query));
    dispatch(fetchLearningPaths());
    dispatch(routeActions.push({pathname: location.pathname, query}));
  };

  let searchForm = (
    <form className='one-column--third one-column__center search-layout'>
      <input type='text' className='input-search' placeholder='Søk etter læringsstier' />
      <button className='btn-search btn-search--negative'>Søk</button>

      <select className='search-filter' value={sortBy} onChange={changeSortOrder}>
        <option value='relevance'>Relevans</option>
        <option value='-lastUpdated'>Nyeste</option>
        <option value='lastUpdated'>Eldste</option>
        <option value='-duration'>Lengste</option>
        <option value='duration'>Korteste</option>
        <option value='title'>Alfabetisk</option>
      </select>
    </form>
  );

  let tiles = learningPaths.map(path => (
    <div key={path.id} className='tile-vertical tile-vertical--shadowbox'>
      {(() => path.coverPhotoUrl ?
        (<img className='tile-vertical__img' src={path.coverPhotoUrl} />) : ''
      )()}
      <div className='tile-vertical__sorting'>
        <h2 className='tile-vertical__title'>{titleI18N(path, lang)}</h2>
        <div className='search-list--meta'>

          <svg className='icon icon--person icon--gray icon__offset'>
            <use xlinkHref='assets/symbol-defs.svg#icon-person' />
          </svg>
          <a rel='author' href='#'>{get(path, 'author.name')}</a>

          <svg className='icon icon--today icon--gray icon__offset'>
            <use xlinkHref='assets/symbol-defs.svg#icon-today' />
          </svg>
          <time>{moment(path.lastUpdated).format('DD.MM.YY')}</time>

          <svg className='icon icon--query-builder icon--gray icon__offset'>
            <use xlinkHref='assets/symbol-defs.svg#icon-query_builder' />
          </svg>
          <time>{calcDuration(path.duration)}</time>
        </div>
        <div>
          {descriptionI18N(path, lang)}
        </div>
      </div>
    </div>
  ));

  return (
    <div className='one-column'>
      <div className='page-header'>
        {searchForm}
      </div>

      <div className='one-column--third'>
        {tiles}
      </div>
    </div>
  );
}

export default connect(state => state)(LearningPathSearch);
