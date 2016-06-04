import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Oembed from './oembed/Oembed';
import { titleI18N, descriptionI18N, oembedContentI18N } from '../../util/i18nFieldFinder';
import polyglot from '../../i18n';
import Icon from '../../components/Icon';

export function LearningPathStep({learningPathStep, learningPath}, {lang}) {
  const stepTitle = titleI18N(learningPathStep, lang);
  const stepDescription = descriptionI18N(learningPathStep, lang);
  const oembedContent = oembedContentI18N(learningPathStep, lang);
  const editStepTarget = `/learningpaths/${learningPath.id}/step/${learningPathStep.id}/edit`;
  let edit = '';
  if (learningPath.canEdit) {
    edit = (
      <div className="block-container_fixed block-container_fixed--bottom--right">
        <Link className="cta-link cta-link--round cta-link--scale" to={editStepTarget}><Icon.Create /> {polyglot.t('editPathStep.edit')}</Link>
      </div>
    );
  }

  return (
    <main className="two-column_col two-column_col--white-bg">
      <div className="learning-step">
        {learningPathStep.showTitle ? (
          <div className="learning-step_hd">
            <h1 className="learning-step_title">{stepTitle}</h1>
          </div>
        ) : null}
        <div className="learning-step_bd" dangerouslySetInnerHTML={{__html: stepDescription}} />
      </div>
      <Oembed oembedContent={oembedContent} />
      {edit}
    </main>
  );
}

LearningPathStep.propTypes = {
  learningPath: PropTypes.object.isRequired,
  learningPathStep: PropTypes.object.isRequired
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

export default connect(state => state)(LearningPathStep);
