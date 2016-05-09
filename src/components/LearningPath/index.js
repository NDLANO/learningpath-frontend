import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import defined from 'defined';

import LearningPathGeneralInfo from './LearningPathGeneralInfo';
import LearningPathPrevNext from './LearningPathPrevNext';
import LearningPathToC from './LearningPathToC';

export function LearningPath(props) {
  const saveButtons = defined(props.saveButtons, null);
  const children = defined(props.main, props.children);
  const sortableTableOfContent = defined(props.sortLearningSteps, <LearningPathToC {...props}/>);
  return (
    <div>
      <div className='two-column'>
        <aside className='two-column_col'>
          <LearningPathGeneralInfo {...props} />
          {sortableTableOfContent}
          {saveButtons}
        </aside>
        <main className='two-column_col'>
          {children}
        </main>
      </div>
      <div>
        <LearningPathPrevNext/>
      </div>
      <div className='learning-path_margin' />
    </div>
  );
}

LearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  saveButtons: PropTypes.object,
  main: PropTypes.object,
  sortLearningSteps: PropTypes.object
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: ownProps.location.pathname,
  isPreview: ownProps.route.isPreview
});

export default connect(mapStateToProps)(LearningPath);
