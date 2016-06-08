
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import LearningPathForm from './LearningPathForm';
import { fetchLearningPathTagsIfNeeded } from './tags/learningPathTagsActions';
import { getLearningPathTagsByLanguageFlatten } from './tags/learningPathTagsSelectors';

import {
  updateLearningPath
} from '../../actions';

class EditLearningPath extends Component {
  componentDidMount() {
    const { fetchLearningPathTags } = this.props;
    fetchLearningPathTags();
  }

  render() {
    const { learningPath, localUpdateLearningPath, lang, tags } = this.props;
    const handleSubmit = values => localUpdateLearningPath(learningPath.id, {
      title: [{title: values.title, language: lang}],
      description: [{description: values.description, language: lang}],
      revision: learningPath.revision,
      duration: (values.duration.replace(/,/g, '.')) * 60,
      tags: values.tags
    });

    return (
      <main className="two-column_col two-column_col--center">
        <LearningPathForm learningPath={learningPath} tagOptions={tags} onSubmit={handleSubmit} lang={lang} />
      </main>
    );
  }
}

EditLearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  learningSteps: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  localUpdateLearningPath: PropTypes.func.isRequired,
  fetchLearningPathTags: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
  learningSteps: get(state, 'learningPath.learningsteps', []),
  tags: getLearningPathTagsByLanguageFlatten(state, ownProps.lang),
});

const mapDispatchToProps = {
  localUpdateLearningPath: updateLearningPath,
  fetchLearningPathTags: fetchLearningPathTagsIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);
