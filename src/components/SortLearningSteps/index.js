import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SortableLearningStepList from './SortableLearningStepList';
import polyglot from '../../i18n';
import {
  updateStepSequenceNumber
} from '../../actions';

const SortLearningSteps = ({ learningPath, localUpdateStepSequenceNumber }) => {
  const handleUpdateSeqNo = () => localUpdateStepSequenceNumber(learningPath.id, learningPath.learningsteps);

  return (
    <div>
      <SortableLearningStepList learningPathId={learningPath.id} learningsteps={learningPath.learningsteps} />
      <ul className="vertical-menu">
        <li className="vertical-menu_item">
          <button className="button button--primary cta-link--block"onClick={handleUpdateSeqNo}>
            {polyglot.t('sortSteps.finish')}
          </button>
        </li>
        <li>
          <Link className="cta-link cta-link--block" to={`/learningpaths/${learningPath.id}`}>
            {polyglot.t('sortSteps.cancel')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

SortLearningSteps.propTypes = {
  learningPath: PropTypes.object.isRequired,
  localUpdateStepSequenceNumber: PropTypes.func.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  learningPath: state.learningPath
});

const mapDispatchToProps = {
  localUpdateStepSequenceNumber: updateStepSequenceNumber
};


export default connect(mapStateToProps, mapDispatchToProps)(SortLearningSteps);
