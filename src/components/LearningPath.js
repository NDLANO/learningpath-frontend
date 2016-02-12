import React from 'react';
import { connect } from 'react-redux';

import LearningPathToc from './LearningPathToC';

export function LearningPath(props) {
  return (
    <div className='two-column'>
      <aside className='two-column_col'>
        <LearningPathToc {...props} />
      </aside>
      <main className='two-column_col'>
        {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  let isPrivate = ownProps.route.isPrivate;

  return Object.assign({}, state, {
    learningPath: isPrivate ? state.privateLearningPath : state.learningPath,
    isPrivate: isPrivate,
    activePathname: ownProps.location.pathname
  });
};

export default connect(mapStateToProps)(LearningPath);

