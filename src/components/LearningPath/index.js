import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LearningPathToC from './LearningPathToC';
import LearningPathGeneralInfo from './LearningPathGeneralInfo';
import LearningPathPrevNext from './LearningPathPrevNext';

export function LearningPath(props) {
  const saveButtons = props.saveButtons ? props.saveButtons : null;
  const children = props.main ? props.main : props.children;

  return (
    <div>
      <div className='two-column'>
        <aside className='two-column_col'>
          <LearningPathGeneralInfo {...props} />
          <LearningPathToC {...props} />
          {saveButtons}
        </aside>
        <main className='two-column_col'>
          {children}
        </main>
      </div>
      <div>
        <LearningPathPrevNext/>
      </div>
    </div>
  );
}

LearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  saveButtons: PropTypes.object,
  main: PropTypes.object
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: ownProps.location.pathname,
  isPreview: ownProps.route.isPreview
});

export default connect(mapStateToProps)(LearningPath);
