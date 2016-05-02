import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import polyglot from '../../i18n';
import Icon from '../Icon';
import { updateLearningPath, updateLearningPathStatus } from '../../actions';

export function LearningPathToCButtons({learningPath, saveAction, saveAndPublishAction}) {
  if (!learningPath.canEdit) {
    return null;
  }

  const newStepTarget = `/learningpaths/${learningPath.id}/step/new`;
  let saveLearningPath = () => saveAction(learningPath);
  let saveAndPublishLearningPath = () => saveAndPublishAction(learningPath);

  return (<div>
    <ul className='vertical-menu'>
      <li className='vertical-menu_item'>
        <a href={newStepTarget} className='cta-link cta-link--block labeled-icon'>
          <Icon.Add /> {polyglot.t('editPage.addStepBtn')}
        </a>
      </li>
      <li className='vertical-menu_item'>
        <a href='#' className='cta-link cta-link--block labeled-icon' onClick={saveLearningPath}>
          <Icon.Save /> {polyglot.t('editPage.saveDraft')}
        </a>
      </li>
      <li className='vertical-menu_item' onClick={saveAndPublishLearningPath}>
        <a href='#' className='button button--outline cta-link--block labeled-icon'>
          {polyglot.t('editPage.saveAndPublish')} <Icon.Forward />
        </a>
      </li>
    </ul>
  </div>);
}

LearningPathToCButtons.propTypes = {
  learningPath: PropTypes.object.isRequired,
  saveAction: PropTypes.func.isRequired,
  saveAndPublishAction: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveAction: (lp) => updateLearningPath(lp.id, lp, '/minside'),
  saveAndPublishAction: (lp) => updateLearningPathStatus(lp.id, 'PUBLISHED', '/minside')
};

export default connect(state => state, mapDispatchToProps)(LearningPathToCButtons);
