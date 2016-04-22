import { connect } from 'react-redux';
import get from 'lodash/get';
import assign from 'lodash/assign';
import { createLearningPathStep } from '../actions';
import { EditLearningPathStep, mapStateToProps, mapDispatchToProps} from './EditLearningPathStep/index.js';

const _mapStateToProps = state => assign({}, mapStateToProps, {
  step: get(state, 'learningPathStep', {}),
  learningPathId: ''
});

const _mapDispatchToProps = assign({}, mapDispatchToProps, {
  saveAction: (learningPathId, lps) => createLearningPathStep(lps)
});

export default connect(_mapStateToProps, _mapDispatchToProps)(EditLearningPathStep);

