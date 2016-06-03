import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import defined from 'defined';

import LearningPathGeneralInfo from './LearningPathGeneralInfo';
import LearningPathPrevNext from './LearningPathPrevNext';
import LearningPathToC from './LearningPathToC';
import { copyLearningPath } from '../../actions';
export function LearningPath(props) {
  const { params: { stepId } } = props;
  const saveButtons = defined(props.saveButtons, null);
  const children = defined(props.main, props.children);
  const sortableTableOfContent = defined(props.sortLearningSteps, <LearningPathToC {...props} />);

  return (
    <div>
      <div className="two-column">
        <aside className="two-column_col">
          <LearningPathGeneralInfo {...props} />
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

LearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  saveButtons: PropTypes.object,
  main: PropTypes.object,
  params: PropTypes.shape({
    stepId: PropTypes.string
  }).isRequired,
  sortLearningSteps: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: ownProps.location.pathname,
  isPreview: ownProps.route.isPreview
});

const mapDispatchToProps = {
  copyPath: copyLearningPath
};


export default connect(mapStateToProps, mapDispatchToProps)(LearningPath);
