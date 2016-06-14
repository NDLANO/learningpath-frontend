import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import LearningPathStepForm from './LearningPathStepForm';
import { stateToHTML } from 'draft-js-export-html';

import {
  updateLearningPathStep,
  createLearningPathStep
} from '../learningPathStepActions';
import { pushOrAssignLanguageValue } from '../../../util/i18nFieldFinder';

export function EditLearningPathStep(props, { lang: language }) {
  const {
    step,
    saveLearningPathStep,
    learningPathId,
  } = props;

  const handleSubmit = (values) => {
    const descriptionHTML = stateToHTML(values.description);
    const toSave = Object.assign({}, step, {
      type: values.type,
      showTitle: values.showTitle,
      title: pushOrAssignLanguageValue(step.title, 'title', values.title, language),
      description: pushOrAssignLanguageValue(step.description, 'description', descriptionHTML, language),
      embedContent: pushOrAssignLanguageValue(step.embedContent, 'url', values.url, language),
    });
    return saveLearningPathStep(learningPathId, toSave);
  };


  return (
    <main className="two-column_col two-column_col--white-bg">
      <div className="learning-path-step">
        <LearningPathStepForm
          step={step}
          learningPathId={learningPathId}
          onSubmit={handleSubmit}
          lang={language}
        />
      </div>
    </main>
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
