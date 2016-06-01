import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import LearningPathStepForm from './LearningPathStepForm';
import Main from '../Main';

import {
  updateLearningPathStep,
  createLearningPathStep
} from '../../actions';
import { pushOrAssignLanguageValue } from '../../util/i18nFieldFinder';

export function EditLearningPathStep(props, { lang: language }) {
  const {
    step,
    saveLearningPathStep,
    learningPathId,
  } = props;

  const handleSubmit = (values) => {
    const toSave = Object.assign({}, step, {
      type: values.type,
      title: pushOrAssignLanguageValue(step.title, 'title', values.title, language),
      description: pushOrAssignLanguageValue(step.description, 'description', values.description, language),
      embedContent: pushOrAssignLanguageValue(step.embedContent, 'url', values.url, language),
    });
    return saveLearningPathStep(learningPathId, toSave);
  };


  return (
    <Main className="two-column_col two-column_col--white-bg">
      <div className="learning-path-step">
        <LearningPathStepForm
          step={step}
          learningPathId={learningPathId}
          onSubmit={handleSubmit}
          lang={language}
        />
      </div>
    </Main>
  );
}

EditLearningPathStep.propTypes = {
  step: PropTypes.object.isRequired,
  saveLearningPathStep: PropTypes.func.isRequired,
  learningPathId: PropTypes.number.isRequired,
};

EditLearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

export const mapStateToProps = state => assign({}, state, {
  step: state.learningPathStep,
  learningPathId: state.learningPath.id,
});

export const mapDispatchToProps = {
  saveLearningPathStep: (learningPathId, lps) => (lps.id ? updateLearningPathStep(learningPathId, lps.id, lps) : createLearningPathStep(learningPathId, lps)),
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPathStep);
