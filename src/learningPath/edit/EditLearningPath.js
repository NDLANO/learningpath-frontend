/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Redirect } from 'react-router-dom';
import LearningPathForm from './LearningPathForm';
import { fetchLearningPathTagsIfNeeded } from './tags/learningPathTagsActions';
import { fetchLearningPathContributorsIfNeeded } from './copyright/learningPathContributorsActions';
import { getLearningPathTags } from './tags/learningPathTagsSelectors';
import {
  fetchLearningPathImages,
  fetchLearningPathImage,
  fetchLearningPathImageWithMetaUrl,
} from '../../imageSearch/imageActions';
import { updateLearningPath } from '../learningPathActions';
import {
  getLearningPath,
  getLearningPathSteps,
} from '../learningPathSelectors';
import { getLocale } from '../../locale/localeSelectors';
import polyglot from '../../i18n';

class EditLearningPath extends Component {
  componentDidMount() {
    const { fetchLearningPathTags, fetchLearningPathContributors } = this.props;
    fetchLearningPathTags();
    fetchLearningPathContributors();
  }

  render() {
    const {
      learningPath,
      localFetchImages,
      localUpdateLearningPath,
      localFetchImage,
      lang: language,
      tags,
      contributors,
    } = this.props;

    if (!learningPath.id) {
      return null;
    }

    if (!learningPath.canEdit) {
      return <Redirect to="/forbidden" />;
    }

    const handleSubmit = values =>
      localUpdateLearningPath(learningPath.id, {
        title: values.title,
        description: values.description,
        language,
        revision: learningPath.revision,
        duration: values.duration.replace(/,/g, '.') * 60,
        tags: values.tags,
        copyright: {
          license: {
            license: 'by-sa',
            description: 'Creative Commons Attribution-ShareAlike 2.0 Generic',
            url: 'https://creativecommons.org/licenses/by-sa/2.0/',
          },
          contributors: !isEmpty(values.contributors)
            ? values.contributors
            : undefined,
        },
        coverPhotoMetaUrl: !isEmpty(values.coverPhotoMetaUrl)
          ? values.coverPhotoMetaUrl
          : undefined,
      });

    return (
      <div className="two-column_content">
        <Helmet title={polyglot.t('editPage.title')} />
        <LearningPathForm
          learningPath={learningPath}
          tagOptions={tags}
          contributorOptions={contributors}
          onSubmit={handleSubmit}
          localFetchImages={localFetchImages}
          fetchImage={localFetchImage}
          lang={language}
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
  contributors: PropTypes.array.isRequired,
  localUpdateLearningPath: PropTypes.func.isRequired,
  fetchLearningPathTags: PropTypes.func.isRequired,
  localFetchImages: PropTypes.func.isRequired,
  localFetchImage: PropTypes.func.isRequired,
  localFetchImageWithMetaUrl: PropTypes.func.isRequired,
  fetchLearningPathContributors: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
  Object.assign({}, state, {
    learningPath: getLearningPath(state),
    learningSteps: getLearningPathSteps(state),
    tags: getLearningPathTags(state),
    contributors: get(state, 'learningPathContributors.all', []),
    licenses: get(state, 'learningPathLicenses.creativeCommonLicenses.all', []),
    lang: getLocale(state),
  });

const mapDispatchToProps = {
  localUpdateLearningPath: updateLearningPath,
  fetchLearningPathTags: fetchLearningPathTagsIfNeeded,
  fetchLearningPathContributors: fetchLearningPathContributorsIfNeeded,
  localFetchImages: fetchLearningPathImages,
  localFetchImage: fetchLearningPathImage,
  localFetchImageWithMetaUrl: fetchLearningPathImageWithMetaUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);
