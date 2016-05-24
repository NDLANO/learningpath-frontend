import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import defined from 'defined';
import classNames from 'classnames';

import LearningPathGeneralInfo from './LearningPathGeneralInfo';
import LearningPathPrevNext from './LearningPathPrevNext';
import LearningPathToC from './LearningPathToC';

export function LearningPath(props) {
  const { params: { stepId } } = props;
  const saveButtons = defined(props.saveButtons, null);
  const children = defined(props.main, props.children);
  const sortableTableOfContent = defined(props.sortLearningSteps, <LearningPathToC {...props}/>);

  const columnClassName = (object) => classNames({
    'two-column_col': true,
    'two-column_col--white-bg': object != undefined,
    'two-column_col--center': object === undefined
  });
  return (
    <div>
      <div className='two-column'>
        <aside className='two-column_col'>
          <LearningPathGeneralInfo {...props} />
          {sortableTableOfContent}
          {saveButtons}
        </aside>
        <main className={columnClassName(stepId)}>
          {children}
        </main>
      </div>
      <div>
        <LearningPathPrevNext currentStepId={stepId} />
      </div>
      <div className='learning-path_margin' />
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
  sortLearningSteps: PropTypes.object
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: ownProps.location.pathname,
  isPreview: ownProps.route.isPreview
});

export default connect(mapStateToProps)(LearningPath);
