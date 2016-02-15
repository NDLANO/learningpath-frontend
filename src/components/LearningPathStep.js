import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { embedUrlI18N } from '../util/i18nFieldFinder';

export function LearningPathStep ({step, lang}) {
  let embedUrl = embedUrlI18N(step, lang);
  return (
    <div className='learning-step'>
      {(() => embedUrl ?
          (<iframe className='learning-step_embeded' src={embedUrl}></iframe>) :
          'no url to embed')()}
    </div>
  );
}

LearningPathStep.propTypes = {
  step: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let isPrivate = ownProps.route.isPrivate;
  return Object.assign({}, state, {
    step: isPrivate ? state.privateLearningPathStep : state.learningPathStep,
    isPrivate: isPrivate
  });
};

export default connect(mapStateToProps)(LearningPathStep);
