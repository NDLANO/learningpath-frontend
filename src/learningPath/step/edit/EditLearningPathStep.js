/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import get from 'lodash/get';

import LearningPathStepForm from './LearningPathStepForm';
import {
  fetchLearningPathStep,
  updateLearningPathStep,
  createLearningPathStep,
} from '../learningPathStepActions';
import { fetchLearningPathLicensesIfNeeded } from '../../edit/copyright/learningPathLicensesActions';
import polyglot from '../../../i18n';
import { getLearningPathStep } from '../learningPathStepSelectors';
import { getLearningPath } from '../../learningPathSelectors';
import { formattedEmbedUrl, formattedEmbedDescription, formattedEmbedLicense } from '../../../util/formatFormFieldsUtil';

export const saveStepObject = (step, values, language) => Object.assign({}, step, {
  type: values.type,
  showTitle: values.showTitle,
  title: values.title,
  language,
  description: formattedEmbedDescription(step, values.description),
  embedUrl: formattedEmbedUrl(step, values.url),
  license: formattedEmbedLicense(values.license),
});

class EditLearningPathStep extends Component {

  componentWillMount() {
    const { authenticated, localIfAuthenticated, localCreateEmptyLearningPathStep, fetchLearningPathLicenses, localFetchLearningPathStep, match: { params: { pathId, stepId } } } = this.props;
    fetchLearningPathLicenses('4.0');


    if (localIfAuthenticated && localCreateEmptyLearningPathStep) {
      localIfAuthenticated(authenticated, localCreateEmptyLearningPathStep);
    } else if (stepId) {
      localFetchLearningPathStep(pathId, stepId, true);
    }
  }

  render() {
    const { lang: language } = this.context;
    const {
      step,
      saveLearningPathStep,
      learningPath,
      licenses,
    } = this.props;
    if (!learningPath || !learningPath.id) {
      return null;
    }

    const handleSubmit = (values) => {
      const toSave = saveStepObject(step, values, language);
      return saveLearningPathStep(learningPath.id, toSave);
    };

    if (this.props.match.path === '/learningpaths/:pathId/step/new' && step.id) {
      return null;
    }

    return (
      <div className="two-column_content--wide learning-path-step two-column_content--white-bg">
        <LearningPathStepForm
          step={step}
          learningPath={learningPath}
          onSubmit={handleSubmit}
          lang={language}
          licenseOptions={licenses}
        />
      </div>
    );
  }
}

EditLearningPathStep.propTypes = {
  step: PropTypes.object.isRequired,
  saveLearningPathStep: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      pathId: PropTypes.string.isRequired,
      stepId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  learningPath: PropTypes.object,
  fetchLearningPathLicenses: PropTypes.func.isRequired,
  localFetchLearningPathStep: PropTypes.func.isRequired,
  licenses: PropTypes.array.isRequired,
  localIfAuthenticated: PropTypes.func,
  localCreateEmptyLearningPathStep: PropTypes.func,
  authenticated: PropTypes.bool.isRequired,
};

EditLearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export const mapStateToProps = state => assign({}, state, {
  step: getLearningPathStep(state),
  learningPath: getLearningPath(state),
  licenses: [{ description: polyglot.t('editPathStep.noLicenseChosen'), license: '' }].concat(get(state, 'learningPathLicenses.creativeCommonLicenses.all', [])),
});

export const mapDispatchToProps = {
  saveLearningPathStep: (learningPathId, lps) => (lps.id ? updateLearningPathStep(learningPathId, lps.id, lps) : createLearningPathStep(learningPathId, lps)),
  fetchLearningPathLicenses: fetchLearningPathLicensesIfNeeded,
  localFetchLearningPathStep: fetchLearningPathStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPathStep);
