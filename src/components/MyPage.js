import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import { sortPrivateLearningPaths } from '../actions';

const byLanguageFinder = fieldName => (obj, lang) => obj[fieldName].find(d => d.language === lang)[fieldName];

const titleI18N = byLanguageFinder('title');
const descriptionI18N = byLanguageFinder('description');

export function MyPage ({dispatch, learningPaths, lang, sortBy}) {
  const items = learningPaths.map(lp => {
    const title = titleI18N(lp, lang);
    const description = descriptionI18N(lp, lang);
    const duration = lp.duration < 60 ?
      lp.duration + ' minutter' :
      Math.round(lp.duration / 60) + ' timer';

    return (
      <div key={lp.id} className='box shadow'>
        <h3>
          <Link to={`/learningpaths/${lp.id}`}>{title}</Link>
        </h3>
        <p>{description}</p>
        <p>{duration}</p>
        <p>{lp.status}</p>
      </div>
    );
  });

  const sortOrderSelect = (
    <select value={sortBy} onChange={(evt) => dispatch(sortPrivateLearningPaths(evt.target.value))}>
      <option value='title'>titel</option>
      <option value='lastUpdated'>dato</option>
      <option value='status'>status</option>
    </select>
  );

  return (<div>
    <div className='site_header'>
      <h1>Mine læringsstier</h1>
      {sortOrderSelect}
    </div>
    <div className='container'>{items}</div>
  </div>);
}

MyPage.propTypes = {
  lang: PropTypes.string.isRequired,
  sortBy: PropTypes.oneOf(['title', 'lastUpdated', 'status']).isRequired,
  learningPaths: PropTypes.array
};

MyPage.defaultProps = { learningPaths: [], sortBy: 'title' };

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
  const learningPaths = sortPaths(state.privateLearningPaths, sortBy, state);
  return Object.assign({}, state, { learningPaths, sortBy });
};

export { mapStateToProps };

export default connect(mapStateToProps)(MyPage);
