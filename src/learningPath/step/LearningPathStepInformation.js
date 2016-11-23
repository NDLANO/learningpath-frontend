/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { descriptionI18N } from '../../util/i18nFieldFinder';
import LearningPathStepLicense from './LearningPathStepLicense';

const LearningPathStepInformation = ({ learningPathStep, stepTitle }, { lang }) => {
  const stepDescription = descriptionI18N(learningPathStep, lang, true);
  return (
    <div className="learning-step">
      {learningPathStep.showTitle ? (
        <div className="learning-step_hd">
          <h1 className="learning-step_title">{stepTitle}</h1>
          <LearningPathStepLicense learningPathStep={learningPathStep} />
        </div>
      ) : null}
      {stepDescription ? <div className="learning-step_bd" dangerouslySetInnerHTML={{ __html: stepDescription }} /> : ''}
    </div>
  );
};

LearningPathStepInformation.propTypes = {
  learningPathStep: PropTypes.object.isRequired,
  stepTitle: PropTypes.string,
};

LearningPathStepInformation.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export default LearningPathStepInformation;
