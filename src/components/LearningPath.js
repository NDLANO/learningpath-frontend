import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LearningPathToC from './LearningPathToC';
import LearningPathGeneralInfo from './LearningPathGeneralInfo';
import LearningPathPrevNext from './LearningPathPrevNext';

export function LearningPath(props) {

  return (
    <div>
      <div className='two-column'>
        <aside className='two-column_col'>
          <LearningPathGeneralInfo {...props} />
          <LearningPathToC {...props} />
        </aside>
        <main className='two-column_col'>
          {props.children}
        </main>
      </div>
      <div>
        <LearningPathPrevNext {...props} />
      </div>
    </div>
  );
}

LearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: ownProps.location.pathname
});

export default connect(mapStateToProps)(LearningPath);
