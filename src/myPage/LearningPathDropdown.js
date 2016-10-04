/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import polyglot from '../i18n';
import Icon from '../common/Icon';

export function LearningPathDropdown({ onSelect, learningPath }) {
  const makeOnClick = actionType => (evt) => {
    evt.preventDefault();
    onSelect(actionType, learningPath);
  };

  const publishAction = makeOnClick(learningPath.status === 'PRIVATE' ? 'publish' : 'unpublish');
  const publishActionText = polyglot.t(
    `pathDropDown.${learningPath.status === 'PRIVATE' ? 'publish' : 'unpublish'}`
  );

  return (
    <div className="dropdown-menu">
      <span className="dropdown-menu_icon"><Icon.MoreVert /></span>
      <ul className="dropdown-menu_items">
        <li className="dropdown-menu_item">
          <a href="#" className="dropdown-menu_link" onClick={makeOnClick('makecopy')}>
            <Icon.ContentCopy /> {polyglot.t('pathDropDown.makeCopy')}
          </a>
        </li>
        <li className="dropdown-menu_item">
          <a href="#" className="dropdown-menu_link" onClick={publishAction}>
            <Icon.Input /> {publishActionText}
          </a>
        </li>
        <li className="dropdown-menu_item">
          <a href="#" className="dropdown-menu_link" onClick={makeOnClick('delete')}>
            <Icon.Delete /> {polyglot.t('pathDropDown.delete')}
          </a>
        </li>
      </ul>
    </div>
  );
}

LearningPathDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired,
};
