import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LearningPathStepDescription from './LearningPathStepDescription';
import Oembed from './Oembed';

import { titleI18N, descriptionI18N, oembedContentI18N } from '../util/i18nFieldFinder';

export function LearningPathStep({learningPathStep}, {lang}) {

  let stepTitle = titleI18N(learningPathStep, lang);
  let stepDescription = descriptionI18N(learningPathStep, lang);
  let oembedContent = oembedContentI18N(learningPathStep, lang);

  return (
    <div>
      <LearningPathStepDescription stepTitle={stepTitle} stepDescription={stepDescription} />
      <Oembed oembedContent={oembedContent} />
    </div>
  );
}

LearningPathStep.propTypes = {
  learningPathStep: PropTypes.object.isRequired
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  learningPathStep: state.learningPathStep
});

export default connect(mapStateToProps)(LearningPathStep);
