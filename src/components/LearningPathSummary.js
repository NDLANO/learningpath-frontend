import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';

import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';

export function LearningPathSummary ({learningPath, lang}) {
  return (
    <div className='learning-path'>
      <div className='learning-path_hd'>
        <h1 className='learning-path_title'>{titleI18N(learningPath, lang)}</h1>
        <div className='learning-path_meta'>
          <div className='learning-path_author'>{get(learningPath, 'author.name')}</div>
          <div className='learning-path_updated-at'>Sist endret {formatDate(learningPath.lastUpdated, lang)}</div>
          <div className='learning-path_duration'>{formatDuration(learningPath.duration, lang)}</div>
        </div>
      </div>
      <div className='learning-path_bd' dangerouslySetInnerHTML={{__html:descriptionI18N(learningPath, lang)}}></div>
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
