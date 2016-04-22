import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LearningPathStepDescription from './LearningPathStepDescription';
import Oembed from './Oembed';

export function LearningPathStep(props) {
  return (
    <div>
      <LearningPathStepDescription {...props} />
      <Oembed {...props} />
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
