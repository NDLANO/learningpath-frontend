import React from 'react';
import { connect } from 'react-redux';

import LearningPathToc from './LearningPathToC';

export function LearningPath(props) {
  const {params, children} = props;

  return (
    <div>
      <LearningPathToc {...props} />
      {children}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.privateLearningPath,
  isPrivate: ownProps.route.isPrivate
});

export default connect(mapStateToProps)(LearningPath);

