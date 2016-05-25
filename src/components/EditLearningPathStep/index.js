import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import MediaTypeSelect from './MediaTypeSelect';
import LearningPathStepForm from './LearningPathStepForm';

import {
  updateLearningPathStepType
} from '../../actions';

export function EditLearningPathStep(props) {
  const {
    step,
    updateType
  } = props;

  const currentView = () => {
    if (step.type) {
      return <LearningPathStepForm {...props} />;
    }
    return <MediaTypeSelect value={step.type} onChange={updateType} />;
  };

  return (
    <main className="two-column_col two-column_col--white-bg">
      <div className="learning-path-step">
        {currentView()}
      </div>
    </main>
  );
}

EditLearningPathStep.propTypes = {
  step: PropTypes.object.isRequired,
  updateType: PropTypes.func.isRequired
};

EditLearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

export const mapStateToProps = state => assign({}, state, {
  step: state.learningPathStep

});

export const mapDispatchToProps = {
  // actions som endrer learningPathStep i redux store:
  updateType: updateLearningPathStepType
  // action til persistere learningPathStep
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPathStep);
