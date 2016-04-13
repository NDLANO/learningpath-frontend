import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import LabeledIcon from './LabeledIcon';
import polyglot from '../i18n';

import {
  sortPrivateLearningPaths,
  deleteLearningPath
} from '../actions';

import Icon from './Icon';
import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';

export function MyPage ({dispatch, learningPaths, sortBy}, {lang}) {
  const items = learningPaths.map(lp => {
    const title = titleI18N(lp, lang);
    const description = descriptionI18N(lp, lang);
    const duration = formatDuration(lp.duration, lang);
    const lastUpdated = formatDate(lp.lastUpdated, lang);

    return (
      <div key={lp.id} className='tile'>
        <button className='alert_dismiss un-button' onClick={() => dispatch(deleteLearningPath(lp.id))}>
          <Icon.Clear />
        </button>
        <h3 className='tile_hd'>
          <Link to={`/learningpaths/${lp.id}/edit`}>{title}</Link>
        </h3>
        <div className='tile_bd'>{description}</div>
        <div className='tile_ft'>
          <p>{duration}</p>
          <p>{polyglot.t('myPage.lastUpdated')} {lastUpdated}</p>
          <p>{polyglot.t('myPage.statusValue.' + lp.status)}</p>
        </div>
      </div>
    );
  });

  const sortOrderSelect = (
    <select value={sortBy} onChange={(evt) => dispatch(sortPrivateLearningPaths(evt.target.value))}>
      <option value='title'>{polyglot.t('myPage.order.title')}</option>
      <option value='lastUpdated'>{polyglot.t('myPage.order.lastUpdated')}</option>
      <option value='status'>{polyglot.t('myPage.order.status')}</option>
    </select>
  );

  return (<div>
    <div className='page-header'>
      <h2 className='page-header_name'>{polyglot.t('myPage.pageHeader')}</h2>
      <div className='page-header_ctrls'>
        {sortOrderSelect}
      </div>
    </div>
    <div className='tiles'>{items}</div>
    <div>
      <Link className='cta-link new-learningpath-button' to='/learningpaths/new'>
        <LabeledIcon.Add labelText={polyglot.t('myPage.newBtn')} />
      </Link>
    </div>
  </div>);
}

MyPage.propTypes = {
  sortBy: PropTypes.oneOf(['title', 'lastUpdated', 'status']).isRequired,
  dispatch: PropTypes.func.isRequired,
  learningPaths: PropTypes.array
};

MyPage.defaultProps = { learningPaths: [], sortBy: 'title' };

MyPage.contextTypes = {
  lang: PropTypes.string.isRequired
};

const sortPaths = (paths, field, state) => {
  switch (field) {
  case 'title':
    return sortBy(paths, (p) => titleI18N(p, state.lang));

  case 'lastUpdated':
    return reverse(sortBy(paths, field));

  default:
    return sortBy(paths, field);
  }
};

const mapStateToProps = (state) => {
  const sortBy = state.privateLearningPathsSortBy || 'title';
  const learningPaths = sortPaths(state.learningPaths, sortBy, state);
  return Object.assign({}, state, { learningPaths, sortBy });
};

export { mapStateToProps };

export default connect(mapStateToProps)(MyPage);
