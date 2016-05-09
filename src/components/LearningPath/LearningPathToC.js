import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import classNames from 'classnames';
import polyglot from '../../i18n';

import { titleI18N } from '../../util/i18nFieldFinder';

export default function LearningPathToC ({learningPath, activePathname}, {lang}) {
  const base = `/learningpaths/${learningPath.id}`;
  const itemClassName = (path) => classNames({
    'step-nav_item': true,
    'step-nav_item--active': path === activePathname
  });

  let sortPathTarget = `/learningpaths/${learningPath.id}/sort`;
  const sort = learningPath.canEdit ? <Link className='cta-link cta-link--block' to={sortPathTarget}>{polyglot.t('sortSteps.sort')}</Link> : '';

  return (
    <div>
      <div className='step-nav'>
        <ul className='step-nav_list'>
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
      <div>
        <ul className='vertical-menu'>
          <li className='vertical-menu_item'>
          {sort}
          </li>
        </ul>
      </div>
    </div>
  );
}

LearningPathToC.propTypes = {
  learningPath: PropTypes.object.isRequired,
  activePathname: PropTypes.string
};

LearningPathToC.contextTypes = {
  lang: PropTypes.string.isRequired
};

LearningPathToC.defaultProps = {
  activePathname: ''
};
