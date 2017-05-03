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
import { convertToHTML } from 'draft-convert';
import get from 'lodash/get';

import LearningPathStepForm from './LearningPathStepForm';
import {
  fetchLearningPathStep,
  updateLearningPathStep,
  createLearningPathStep,
} from '../learningPathStepActions';
import { fetchLearningPathLicensesIfNeeded } from '../../edit/copyright/learningPathLicensesActions';
import polyglot from '../../../i18n';
import { getI18nLearningPathStep } from '../learningPathStepSelectors';
import { getI18nLearningPath } from '../../learningPathSelectors';

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
      const descriptionHTML = !values.description.hasText() ? undefined : convertToHTML({
        styleToHTML: (style) => {
          if (style === 'UNDERLINE') {
            return <u />;
          }
          return undefined;
        },
      })(values.description);

      const emptyEmbedUrl = !step.embedUrl.url ? [] : [{ url: '', language, embedType: 'oembed' }];
      const emptyDescription = !step.description ? [] : [{ description: '', language }];

      const toSave = Object.assign({}, step, {
        type: values.type,
        showTitle: values.showTitle,
        title: [{ title: values.title, language }],
        description: descriptionHTML ? [{ description: descriptionHTML, language }] : emptyDescription,
        embedUrl: values.url && values.url.url ? [{ url: values.url.url, language, embedType: values.url.embedType }] : emptyEmbedUrl,
        license: values.license && values.license.license ? values.license.license : '',
      });

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
  step: getI18nLearningPathStep(state),
  learningPath: getI18nLearningPath(state),
  licenses: [{ description: polyglot.t('editPathStep.noLicenseChosen'), license: '' }].concat(get(state, 'learningPathLicenses.creativeCommonLicenses.all', [])),
});

export const mapDispatchToProps = {
  saveLearningPathStep: (learningPathId, lps) => (lps.id ? updateLearningPathStep(learningPathId, lps.id, lps) : createLearningPathStep(learningPathId, lps)),
  fetchLearningPathLicenses: fetchLearningPathLicensesIfNeeded,
  localFetchLearningPathStep: fetchLearningPathStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPathStep);
