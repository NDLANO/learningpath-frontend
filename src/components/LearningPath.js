import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LearningPathToC from './LearningPathToC';
import LearningPathGeneralInfo from './LearningPathGeneralInfo';

export function LearningPath(props) {
  return (
    <div className='two-column'>
      <aside className='two-column_col'>
        <LearningPathGeneralInfo {...props} />
        <LearningPathToC {...props} />
      </aside>
      <main className='two-column_col'>
        {props.children}
      </main>
    </div>
  );
}

LearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let isPrivate = ownProps.route.isPrivate;

  return Object.assign({}, state, {
    learningPath: isPrivate ? state.privateLearningPath : state.learningPath,
    isPrivate: isPrivate,
    activePathname: ownProps.location.pathname
  });
};

export default connect(mapStateToProps)(LearningPath);
