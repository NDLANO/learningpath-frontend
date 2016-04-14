import React, { PropTypes } from 'react';
import updateLearningPathStatus from '../actions/updateLearningPathStatus';
import { deleteLearningPath } from '../actions';
import Icon from './Icon';

export function LearningPathDropdown ({dispatch, learningPath}) {
  return (
    <div className='dropdown-menu'>
      <span className='dropdown-icon'><Icon.MoreVert color="gray" /></span>
      <ul className='dropdown-items'>
        {(() => learningPath.status === 'PRIVATE'
          ? <li className='dropdown-item'><a href="#" onClick={() => dispatch(updateLearningPathStatus(learningPath.id, 'PUBLISHED'))}><Icon.Input color="gray" /> Publiser</a></li>
          : <li className='dropdown-item'><a href="#" onClick={() => dispatch(updateLearningPathStatus(learningPath.id, 'PRIVATE'))}><Icon.Input color="gray" /> De-publiser</a></li>
        )()}
        <li className='dropdown-item'><a href="#" onClick={() => dispatch(deleteLearningPath(learningPath.id))}><Icon.Delete color="gray" /> Slett</a></li>
      </ul>
    </div>
  );
}

LearningPathDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired
};

LearningPathDropdown.defaultProps = { learningPath: {} };
