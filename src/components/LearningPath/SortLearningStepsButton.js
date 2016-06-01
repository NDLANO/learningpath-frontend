import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import polyglot from '../../i18n';

export function SortLearningStepsButton({learningPath}) {
  if (!learningPath.canEdit) {
    return null;
  }

  let target = `/learningpaths/${learningPath.id}/sort`;

  return (
    <div>
      <ul className="vertical-menu">
        <li className="vertical-menu_item">
          <Link className="cta-link cta-link--block" to={target}>{polyglot.t('sortSteps.sortOrDelete')}</Link>
        </li>
      </ul>
    </div>
  );
}

SortLearningStepsButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
};

export default connect(state => state)(SortLearningStepsButton);
