import React, { PropTypes } from 'react';
import Icon from './Icon';

export function LearningPathDropdown ({onSelect, learningPath}) {
  const makeOnClick = (actionType) => (evt) => {
    evt.preventDefault();
    onSelect(actionType, learningPath);
  };

  const publishAction = makeOnClick(learningPath.status === 'PRIVATE' ? 'publish' : 'unpublish');
  const publishActionText = learningPath.status === 'PRIVATE' ? 'Publiser' : 'Gjør privat';

  return (
    <div className='dropdown-menu'>
      <span className='dropdown-menu_icon'><Icon.MoreVert /></span>
      <ul className='dropdown-menu_items'>
        <li className='dropdown-menu_item'>
          <a href="#" className='dropdown-menu_link' onClick={publishAction}>
            <Icon.Input /> {publishActionText}
          </a>  
        </li>
        <li className='dropdown-menu_item'>
          <a href="#" className='dropdown-menu_link' onClick={makeOnClick('delete')}>
            <Icon.Delete /> Slett
          </a>
        </li>
      </ul>
    </div>
  );
}

LearningPathDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired
};
