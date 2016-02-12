import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import get from 'lodash/get';

import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';

export function LearningPathSummary ({learningPath, lang}) {
  const duration = learningPath.duration < 60 ?
    learningPath.duration + ' minutter' :
    Math.round(learningPath.duration / 60) + ' timer';
  const lastUpdated = moment(learningPath.lastUpdated).format('DD.MM.YY');

  return (
    <div className='learning-path'>
      <div className='learning-path_hd'>
        <h1 className='learning-path_title'>{titleI18N(learningPath, lang)}</h1>
        <div className='learning-path_meta'>
          <div className='learning-path_author'>{get(learningPath, 'author.name')}</div>
          <div className='learning-path_updated-at'>Sist endret {lastUpdated}</div>
          <div className='learning-path_duration'>{duration}</div>
        </div>
      </div>
      <div className='learning-path_bd'>
        {descriptionI18N(learningPath, lang)}
      </div>
    </div>
  );
}

LearningPathSummary.propTypes = {
  learningPath: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let isPrivate = ownProps.route.isPrivate;
  return Object.assign({}, state, {
    learningPath: isPrivate ? state.privateLearningPath : state.learningPath,
    isPrivate: isPrivate
  });
};

export default connect(mapStateToProps)(LearningPathSummary);
