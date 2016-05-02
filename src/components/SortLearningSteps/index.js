import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SortableStepsContainer from './SortableStepsContainer';
import polyglot from '../../i18n';


export function SortLearningSteps(props) {
  let finishPathTarget = `/learningpaths/${props.learningPath.id}`;
  const finish = props.learningPath.canEdit ? <Link className='cta-link--block' to={finishPathTarget}>{polyglot.t('sortSteps.finish')}</Link> : '';

  return (
    <div>
      <SortableStepsContainer />
      {finish}
    </div>
  );
}

SortLearningSteps.propTypes = {
  learningPath: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
});

export default connect(mapStateToProps)(SortLearningSteps);
