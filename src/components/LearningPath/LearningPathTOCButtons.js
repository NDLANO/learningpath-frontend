import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
        <Link to={newStepTarget} className='cta-link cta-link--block labeled-icon'>
          <Icon.Add /> {polyglot.t('editPage.addStepBtn')}
        </Link>
      </li>
      <li className='vertical-menu_item'>
        <button className='cta-link cta-link--block labeled-icon' onClick={saveLearningPath}>
          <Icon.Save /> {polyglot.t('editPage.saveDraft')}
        </button>
      </li>
      <li className='vertical-menu_item' onClick={saveAndPublishLearningPath}>
        <button className='button button--outline cta-link--block labeled-icon'>
          {polyglot.t('editPage.saveAndPublish')} <Icon.Forward />
        </button>
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
