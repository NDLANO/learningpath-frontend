/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SafeLink from '@ndla/safelink';
import Tooltip from '@ndla/tooltip';
import { Link as LinkIcon } from '@ndla/icons/common';
import LearningPathStepLicense from './LearningPathStepLicense';
import { CopyrightObjectShape } from '../../shapes';
import config from '../../config';
import polyglot from '../../i18n';

const LearningPathStepInformation = ({
  learningPathStep,
  copyright,
  stepTitle,
}) => {
  const isNDLAArticleIframeUrl = url =>
    /^http(s)?:\/\/((.*)\.)?ndla.no\/((.*)\/)?article-iframe\/\d*/.test(url);
  const embedUrl = learningPathStep?.embedUrl?.url || '';

  const linkToEd = (url, id) => {
    // TODO usikker på denne,
    if (url.includes('topic')) {
      return `${
        config.editorialFrontendDomain
      }/subject-matter/topic-article/${id}/edit/nb`;
    } else {
      return `${
        config.editorialFrontendDomain
      }/subject-matter/learning-resource/${id}/edit/`;
    }
  };

  const EditorialLinkButton = () => {
    const splittedHref = embedUrl.split('/');
    const articleId = splittedHref.pop();
    const edLink = linkToEd(embedUrl, articleId);

    return (
      <Tooltip tooltip={polyglot.t('learningPath.editInEditorial')}>
        <LinkIcon />{' '}
        <SafeLink to={edLink} target="_blank">
          {polyglot.t('learningPath.editInEditorial')}
        </SafeLink>
      </Tooltip>
    );
  };

  return (
    <div className="learning-step">
      {learningPathStep.showTitle ? <h1>{stepTitle}</h1> : null}
      {isNDLAArticleIframeUrl(embedUrl) && <EditorialLinkButton />}
      {learningPathStep.description ? (
        <div className="learning-step_licence-description">
          <LearningPathStepLicense
            copyright={copyright}
            learningPathStep={learningPathStep}
          />
          <div
            dangerouslySetInnerHTML={{ __html: learningPathStep.description }}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

LearningPathStepInformation.propTypes = {
  learningPathStep: PropTypes.object.isRequired,
  stepTitle: PropTypes.string,
  copyright: CopyrightObjectShape,
};

export default LearningPathStepInformation;
