import React from 'react';
import { connect } from 'react-redux';

import LearningPathToc from './LearningPathToC';
import { titleI18N } from '../util/i18nFieldFinder';

export function LearningPath(props) {
  const {children, learningPath, lang} = props;

  return (
    <div className='learning-path-wrapper'>
      <aside className='learning-path-primary-nav'>
        <h3>{titleI18N(learningPath, lang)}</h3>
        <LearningPathToc {...props} />
      </aside>
      <main className='learning-path-content'>
        {children}
      </main>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.privateLearningPath,
  isPrivate: ownProps.route.isPrivate
});

export default connect(mapStateToProps)(LearningPath);

