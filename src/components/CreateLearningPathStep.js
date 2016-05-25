import { connect } from 'react-redux';
import get from 'lodash/get';
import assign from 'lodash/assign';
import { EditLearningPathStep, mapStateToProps, mapDispatchToProps} from './EditLearningPathStep/index.js';

const extendMapStateToProps = state => assign({}, mapStateToProps, {
  step: get(state, 'learningPathStep', {}),
  learningPathId: state.learningPath.id
});

const extendMapDispatchToProps = assign({}, mapDispatchToProps, {
});

export default connect(extendMapStateToProps, extendMapDispatchToProps)(EditLearningPathStep);
