import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import LearningPathStepDescription from './LearningPathStepDescription';
import Oembed from './Oembed';
import { titleI18N, descriptionI18N, oembedContentI18N } from '../util/i18nFieldFinder';
import polyglot from '../i18n';
import Icon from './Icon';

export function LearningPathStep({learningPathStep, learningPath, closeSidebars}, {lang}) {
  let stepTitle = titleI18N(learningPathStep, lang);
  let stepDescription = descriptionI18N(learningPathStep, lang);
  let oembedContent = oembedContentI18N(learningPathStep, lang);
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
    <main className="two-column_col two-column_col--white-bg" onClick={closeSidebars}>
      <LearningPathStepDescription stepTitle={stepTitle} stepDescription={stepDescription} />
      <Oembed oembedContent={oembedContent} />
      {edit}
    </main>
  );
}

LearningPathStep.propTypes = {
  learningPath: PropTypes.object.isRequired,
  closeSidebars: PropTypes.func.isRequired,
  learningPathStep: PropTypes.object.isRequired
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

export default connect(state => state)(LearningPathStep);
