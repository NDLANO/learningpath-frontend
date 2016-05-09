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
    /*Icon.TypeText = props => (<Icon {...props} className={'icon--menu '+props.className} svgDefId='icon-menu' />);
    Icon.TypeMedia = props => (<Icon {...props} className={'icon--play-circle-outline '+props.className} svgDefId='icon-play_circle_outline' />);
    Icon.TypeQuiz = props => (<Icon {...props} className={'icon--contacts '+props.className} svgDefId='icon-contacts' />);
    Icon.TypeTask = Icon.TypeText;
    Icon.TypeSummary = Icon.TypeText;*/
    return '<Icon.type />'
    /*return <Icon.TypeText />
    if (indexOf(LearningPathTocTypes.TEXT_TYPE, type) != -1){
    }
    return '';*/
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
