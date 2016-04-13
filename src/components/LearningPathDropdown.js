import React, { PropTypes } from 'react';
import updateLearningPathStatus from '../actions/updateLearningPathStatus';
import { deleteLearningPath } from '../actions';
import Icon from './Icon';

export function LearningPathDropdown ({dispatch, learningPath}) {
  return (
    <div className='dropdown-menu'>
      <ul>
        <li>
          <button className='un-button'><Icon.MoreVert color="gray" /></button>
          <ul className='dropdown-items'>
            {(() => learningPath.status === 'PRIVATE'
              ? <li className='dropdown-item'><a href="#" onClick={() => dispatch(updateLearningPathStatus(learningPath.id, 'PUBLISHED'))}>Publiser</a></li>
              : <li className='dropdown-item'><a href="#" onClick={() => dispatch(updateLearningPathStatus(learningPath.id, 'PRIVATE'))}>De-publiser</a></li>
            )()}
            <li className='dropdown-item'><a href="#" onClick={() => dispatch(deleteLearningPath(learningPath.id))}>Slett</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

LearningPathDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired
};

LearningPathDropdown.defaultProps = { learningPath: {} };
