import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import classNames from 'classnames';
import polyglot from '../../i18n';
import Icon from '../Icon';
import lowerCase from 'lodash/lowerCase';
import indexOf from 'lodash/indexOf';

import { titleI18N } from '../../util/i18nFieldFinder';
import LearningPathTocTypes from './LearningPathTocTypes';

export default function LearningPathToC ({learningPath, activePathname}, {lang}) {
  const base = `/learningpaths/${learningPath.id}`;
  const itemClassName = (path) => classNames({
    'step-nav_item': true,
    'step-nav_item--active': path === activePathname
  });
  const iconClassName = (type) => {
    if (indexOf(LearningPathTocTypes.TEXT_TYPE, type) != -1){
      return <Icon.TypeText />;
    }
    else if (indexOf(LearningPathTocTypes.MULTIMEDIA, type) != -1){
      return <Icon.TypeMedia />;
    }
    else if(indexOf(LearningPathTocTypes.QUIZ, type) != -1){
      return <Icon.TypeQuiz />;
    }
    return <Icon.TypeText />;
  };
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
                <span className='step-nav_circle'>
                  {iconClassName(step.type)}
                </span>
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
