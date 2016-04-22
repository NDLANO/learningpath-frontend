import { connect } from 'react-redux';
import get from 'lodash/get';
import { createLearningPath } from '../actions';
import { EditLearningPathStep, mapStateToProps,  mapDispatchToProps} from './EditLearningPathStep';

const mapDispatch = Object.assign({}, mapDispatchToProps, {
  saveAction: (learningPathId, lps) => createLearningPathStep(learningPathId, lps.id, lps)
});

const mapStateToPropss = Object.assign({}, mapStateToProps, {
  step: get(state, 'learningPathStep', {})
});

export default connect(mapStateToPropss, mapDispatch)(EditLearningPathStep);
