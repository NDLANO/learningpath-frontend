import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import defined from 'defined';

import LearningPathGeneralInfo from './LearningPathGeneralInfo';
import LearningPathPrevNext from './LearningPathPrevNext';
import LearningPathToC from './LearningPathToC';
import { fetchLearningPath } from '../../actions';

export class LearningPath extends Component {

  componentDidMount() {
    const { localFetchLearingPath, params: { pathId } } = this.props;
    localFetchLearingPath(pathId);
  }

  render() {
    const { params: { stepId }, sortLearningSteps, main} = this.props;
    const saveButtons = defined(this.props.saveButtons, null);
    const children = defined(main, this.props.children);
    const sortableTableOfContent = defined(sortLearningSteps, <LearningPathToC {...this.props} />);

    return (
      <div>
        <div className="two-column">
          <aside className="two-column_col">
            <LearningPathGeneralInfo {...this.props} />
            {sortableTableOfContent}
            {saveButtons}
          </aside>
          {children}
        </div>
        <div>
          <LearningPathPrevNext currentStepId={stepId} />
        </div>
        <div className="learning-path_margin" />
      </div>
    );
  }
}

LearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  saveButtons: PropTypes.object,
  main: PropTypes.object,
  params: PropTypes.shape({
    pathId: PropTypes.string.isRequired,
    stepId: PropTypes.string
  }).isRequired,
  sortLearningSteps: PropTypes.object,
  localFetchLearingPath: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: ownProps.location.pathname,
  isPreview: ownProps.route.isPreview
});

const mapDispatchToProps = {
  localFetchLearingPath: fetchLearningPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPath);
