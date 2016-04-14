import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { oembedI18N } from '../util/i18nFieldFinder';



export function LearningPathStep ({step}, {lang}) {
  let iframe = oembedI18N(step, lang);

  console.log(step);
  return (
    <div className='learning-step' dangerouslySetInnerHTML={{__html: iframe}}/>
  );
}

LearningPathStep.propTypes = {
  step: PropTypes.object.isRequired
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  step: state.learningPathStep
});

export default connect(mapStateToProps)(LearningPathStep);
