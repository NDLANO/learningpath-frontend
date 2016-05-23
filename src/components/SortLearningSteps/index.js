import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SortableLearningStepList from './SortableLearningStepList';
import polyglot from '../../i18n';

const SortLearningSteps = ({ learningPath }) =>
  <div>
    <SortableLearningStepList learningPathId={learningPath.id} learningsteps={learningPath.learningsteps} />
    <ul className="vertical-menu">
      <li>
        <Link className="cta-link cta-link--block" to={`/learningpaths/${learningPath.id}`}>
          {polyglot.t('sortSteps.finish')}
        </Link>
      </li>
    </ul>
  </div>
;


SortLearningSteps.propTypes = {
  learningPath: PropTypes.object.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  learningPath: state.learningPath
});

export default connect(mapStateToProps)(SortLearningSteps);
