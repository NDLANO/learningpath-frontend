import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import { stateToHTML } from 'draft-js-export-html';
import get from 'lodash/get';

import LearningPathStepForm from './LearningPathStepForm';
import {
  updateLearningPathStep,
  createLearningPathStep,
} from '../learningPathStepActions';
import { fetchLearningPathLicensesIfNeeded } from '../../edit/copyright/learningPathLicensesActions';

class EditLearningPathStep extends Component {
  componentDidMount() {
    const { fetchLearningPathLicenses } = this.props;
    fetchLearningPathLicenses();
  }
  render() {
    const {
      lang: language,
    } = this.context;
    const {
      step,
      saveLearningPathStep,
      learningPathId,
      licenses,
    } = this.props;
    if (!learningPathId) {
      return null;
    }

    const handleSubmit = (values) => {
      const descriptionHTML = stateToHTML(values.description);
      const toSave = Object.assign({}, step, {
        type: values.type,
        showTitle: values.showTitle,
        title: [{ title: values.title, language }],
        description: [{ description: descriptionHTML, language }],
        embedUrl: values.url ? [{ url: values.url, language }] : [],
        license: values.license && values.license ? values.license.license : '',
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
            licenseOptions={licenses}
          />
        </div>
      </main>
    );
  }
}

EditLearningPathStep.propTypes = {
  step: PropTypes.object.isRequired,
  saveLearningPathStep: PropTypes.func.isRequired,
  learningPathId: PropTypes.number,
  fetchLearningPathLicenses: PropTypes.func.isRequired,
  licenses: PropTypes.array.isRequired,
};

EditLearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export const mapStateToProps = state => assign({}, state, {
  step: state.learningPathStep,
  learningPathId: state.learningPath.id,
  licenses: get(state, 'learningPathLicenses.all', []),
});

export const mapDispatchToProps = {
  saveLearningPathStep: (learningPathId, lps) => (lps.id ? updateLearningPathStep(learningPathId, lps.id, lps) : createLearningPathStep(learningPathId, lps)),
  fetchLearningPathLicenses: fetchLearningPathLicensesIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPathStep);
