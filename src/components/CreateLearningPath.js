import { connect } from 'react-redux';
import get from 'lodash/get';
import { createEditingLearningPath } from '../actions';
import { EditLearningPath } from './EditLearningPath';

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'editingLearningPath', {}),
  learningSteps: get(state, 'editingLearningPath.learningsteps', []),
  saveAction: createEditingLearningPath
});

export default connect(mapStateToProps)(EditLearningPath);
