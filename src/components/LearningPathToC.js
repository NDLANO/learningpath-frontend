import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import classNames from 'classnames';

import { titleI18N } from '../util/i18nFieldFinder';

export default function LearningPathToc ({learningPath, isPrivate, lang, activePathname}) {
  const base = `/learningpaths${isPrivate ? '/private' : ''}/${learningPath.id}`;
  const itemClassName = (path) => classNames({
    'step-nav_item': true,
    'step-nav_item--active': path === activePathname
  });

  return (
    <div className='step-nav'>
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
