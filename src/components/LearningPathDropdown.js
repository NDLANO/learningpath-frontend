import React, { PropTypes } from 'react';
import updateLearningPathStatus from '../actions/updateLearningPathStatus';
import { deleteLearningPath } from '../actions';
import Icon from './Icon';

export function LearningPathDropdown ({dispatch, learningPath}) {
  return (
    <div className='dropdown-menu'>
      <span className='dropdown-menu_icon'><Icon.MoreVert /></span>
      <ul className='dropdown-menu_items'>
        {(() => learningPath.status === 'PRIVATE'
          ? <li className='dropdown-menu_item'><a href="#" className='dropdown-menu_link' onClick={() => dispatch(updateLearningPathStatus(learningPath.id, 'PUBLISHED'))}><Icon.Input /> Publiser</a></li>
          : <li className='dropdown-menu_item'><a href="#" className='dropdown-menu_link' onClick={() => dispatch(updateLearningPathStatus(learningPath.id, 'PRIVATE'))}><Icon.Input /> Gjør privat</a></li>
        )()}
        <li className='dropdown-menu_item'><a href="#" className='dropdown-menu_link' onClick={() => dispatch(deleteLearningPath(learningPath.id))}><Icon.Delete /> Slett</a></li>
      </ul>
    </div>
  );
}

LearningPathDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired
};

LearningPathDropdown.defaultProps = { learningPath: {} };
