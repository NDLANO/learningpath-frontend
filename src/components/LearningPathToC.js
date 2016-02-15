import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import classNames from 'classnames';
import get from 'lodash/get';

import Icon from './Icon';

import { titleI18N } from '../util/i18nFieldFinder';
import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';


export default function LearningPathToc ({learningPath, isPrivate, lang, activePathname}) {
  const base = `/learningpaths${isPrivate ? '/private' : ''}/${learningPath.id}`;
  const itemClassName = (path) => classNames({
    'step-nav_item': true,
    'step-nav_item--active': path === activePathname
  });

  return (
    <div className='step-nav'>
      <div className='step-nav_learningpath-general-info'>
        <h3 className='step-nav_h'>{titleI18N(learningPath, lang)}</h3>
        <div className='step-nav_meta'>
          <span className='step-nav_author'>
            <Icon.Person className='icon--gray' />
            <a rel='author' href='#'>{get(learningPath, 'author.name')}</a>
          </span>

          <span className='step-nav_changed-date'>
            <Icon.Today className='icon--gray' />
            <time>{formatDate(learningPath.lastUpdated, lang)}</time>
          </span>

          <span className='step-nav_duration'>
            <Icon.QueryBuilder className='icon--gray' />
            <time>{formatDuration(learningPath.duration, lang)}</time>
          </span>
        </div>
      </div>
      <ul className='step-nav_list'>
        <li className={itemClassName(base)}>
          <Link to={base} className='step-nav_link'>Introduksjon</Link>
        </li>
        {((steps) => steps.map(step => (
          <li key={step.id}
            className={itemClassName(`${base}/step/${step.id}`)}>
            <Link to={`${base}/step/${step.id}`} className='step-nav_link'>
              {titleI18N(step, lang)}
            </Link>
          </li>
        )))(defined(learningPath.learningsteps, []))}
      </ul>
    </div>
  );
}

LearningPathToc.propTypes = {
  learningPath: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  activePathname: PropTypes.string,
  isPrivate: PropTypes.bool
};

LearningPathToc.defaultProps = {
  activePathname: '',
  isPrivate: false
};
