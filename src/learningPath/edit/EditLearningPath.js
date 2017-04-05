/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import LearningPathForm from './LearningPathForm';
import { fetchLearningPathTagsIfNeeded } from './tags/learningPathTagsActions';
import { getLearningPathTagsByLanguage } from './tags/learningPathTagsSelectors';
import { fetchLearningPathImages, fetchLearningPathImage, fetchLearningPathImageWithMetaUrl } from '../../imageSearch/imageActions';
import { updateLearningPath } from '../learningPathActions';
import { getI18nLearningPath, getI18nLearningPathSteps } from '../learningPathSelectors';

class EditLearningPath extends Component {
  constructor() {
    super();
    this.state = { unsavedContributor: '' };
  }

  componentDidMount() {
    const { fetchLearningPathTags } = this.props;
    fetchLearningPathTags();
  }

  render() {
    const { learningPath, localFetchImages, localUpdateLearningPath, localFetchImage, lang: language, tags } = this.props;

    if (!learningPath.id) {
      return null;
    }

    const handleContributorChange = changes => this.setState({ unsavedContributor: changes });

    const handleSubmit = (values) => {
      const unsavedContributor = this.state.unsavedContributor;
      if (unsavedContributor.length > 0) values.contributors.push({ name: unsavedContributor, type: 'Forfatter' });

      return localUpdateLearningPath(learningPath.id, {
        title: [{ title: values.title, language }],
        description: [{ description: values.description, language }],
        revision: learningPath.revision,
        duration: (values.duration.replace(/,/g, '.')) * 60,
        tags: [{ tags: values.tags, language }],
        copyright: {
          license: {
            license: 'by-sa',
            description: 'Creative Commons Attribution-ShareAlike 2.0 Generic',
            url: 'https://creativecommons.org/licenses/by-sa/2.0/',
          },
          contributors: !isEmpty(values.contributors) ? values.contributors : undefined,
        },
        coverPhotoMetaUrl: !isEmpty(values.coverPhotoMetaUrl) ? values.coverPhotoMetaUrl : undefined,
      });
    };

    return (
      <div className="two-column_content">
        <LearningPathForm
          learningPath={learningPath} tagOptions={tags} onSubmit={handleSubmit} localFetchImages={localFetchImages}
          fetchImage={localFetchImage} lang={language} onContributorChange={handleContributorChange}
        />
      </div>
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
  localFetchImages: PropTypes.func.isRequired,
  localFetchImage: PropTypes.func.isRequired,
  localFetchImageWithMetaUrl: PropTypes.func.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: getI18nLearningPath(state),
  learningSteps: getI18nLearningPathSteps(state),
  tags: getLearningPathTagsByLanguage(state),
  licenses: get(state, 'learningPathLicenses.creativeCommonLicenses.all', []),
});

const mapDispatchToProps = {
  localUpdateLearningPath: updateLearningPath,
  fetchLearningPathTags: fetchLearningPathTagsIfNeeded,
  localFetchImages: fetchLearningPathImages,
  localFetchImage: fetchLearningPathImage,
  localFetchImageWithMetaUrl: fetchLearningPathImageWithMetaUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);
