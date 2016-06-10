import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Icon from '../../components/Icon';
import polyglot from '../../i18n';

export function SortLearningStepsButton({learningPath}) {
  if (!learningPath.canEdit) {
    return null;
  }

  let target = `/learningpaths/${learningPath.id}/step/sort`;

  return (
    <div>
      <Link className="sort-steps_button" to={target}>
        <Icon.ImportExport />
        {polyglot.t('sortSteps.sortOrDelete')}
      </Link>
    </div>
  );
}

SortLearningStepsButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
};

export default connect(state => state)(SortLearningStepsButton);
