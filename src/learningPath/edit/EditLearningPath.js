/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import LearningPathForm from './LearningPathForm';
import { fetchLearningPathTagsIfNeeded } from './tags/learningPathTagsActions';
import { getLearningPathTagsByLanguage } from './tags/learningPathTagsSelectors';
import { fetchLearningPathImages, fetchLearningPathImage, fetchLearningPathImageWithMetaUrl } from '../../imageSearch/imageActions';
import { updateLearningPath } from '../learningPathActions';
import { getI18nLearningPath, getI18nLearningPathSteps } from '../learningPathSelectors';
import { getLocale } from '../../locale/localeSelectors';

class EditLearningPath extends Component {
  constructor() {
    super();
    this.state = { unsavedContributor: '', unsavedTags: '' };
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

    const handleTagsChange = changes => this.setState({ unsavedTags: changes });
    const handleContributorChange = changes => this.setState({ unsavedContributor: changes });

    const handleSubmit = (values) => {
      const unsavedTags = this.state.unsavedTags;
      const unsavedContributor = this.state.unsavedContributor;
      let tagValues = [...values.tags];
      let contributors = [...values.contributors];

      if (unsavedTags.length > 2) {
        if (tags.indexOf(unsavedTags) === -1) {
          tagValues = [...tagValues, unsavedTags];
          this.setState({ unsavedTags: '' });
        }
      }

      if (unsavedContributor.length > 2) {
        const contributorsName = values.contributors.map(contributor => contributor.name);
        if (contributorsName.indexOf(unsavedContributor) === -1) {
          contributors = [...contributors, { name: unsavedContributor, type: 'Forfatter' }];
          this.setState({ unsavedContributor: '' });
        }
      }

      return localUpdateLearningPath(learningPath.id, {
        title: [{ title: values.title, language }],
        description: [{ description: values.description, language }],
        revision: learningPath.revision,
        duration: (values.duration.replace(/,/g, '.')) * 60,
        tags: [{ tags: tagValues, language }],
        copyright: {
          license: {
            license: 'by-sa',
            description: 'Creative Commons Attribution-ShareAlike 2.0 Generic',
            url: 'https://creativecommons.org/licenses/by-sa/2.0/',
          },
          contributors: !isEmpty(contributors) ? contributors : undefined,
        },
        coverPhotoMetaUrl: !isEmpty(values.coverPhotoMetaUrl) ? values.coverPhotoMetaUrl : undefined,
      });
    };

    return (
      <div className="two-column_content">
        <LearningPathForm
          learningPath={learningPath} tagOptions={tags} onSubmit={handleSubmit} localFetchImages={localFetchImages}
          fetchImage={localFetchImage} lang={language} onContributorChange={handleContributorChange} onTagsChange={handleTagsChange}
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
  lang: getLocale(state),
});

const mapDispatchToProps = {
  localUpdateLearningPath: updateLearningPath,
  fetchLearningPathTags: fetchLearningPathTagsIfNeeded,
  localFetchImages: fetchLearningPathImages,
  localFetchImage: fetchLearningPathImage,
  localFetchImageWithMetaUrl: fetchLearningPathImageWithMetaUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);
