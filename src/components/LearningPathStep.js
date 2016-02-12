import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';

export function LearningPathStep ({step, lang}) {
  return (
    <div className='learning-step'>
      <h2 className='learning-step_title'>{titleI18N(step, lang)}</h2>
      <div className='learing-step_description' dangerouslySetInnerHTML={{__html:descriptionI18N(step, lang)}}></div>
      <pre><code>{JSON.stringify(step, null, 2)}</code></pre>
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
