import { connect } from 'react-redux';
import get from 'lodash/get';
import { createLearningPath } from '../actions';
import { EditLearningPath } from './EditLearningPath';

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
  learningSteps: get(state, 'learningPath.learningsteps', []),
  saveAction: createLearningPath
});

export default connect(mapStateToProps)(EditLearningPath);
