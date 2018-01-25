/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import ImageSearch from '../../imageSearch/ImageSearch';
import Lightbox from '../../common/Lightbox';
import polyglot from '../../i18n';
import Button from '../../common/buttons/Button';
import { getSavedImage } from '../../imageSearch/imageSelectors';

const ChoseImage = props => {
  const { onImageLightboxOpen } = props;
  return (
    <div>
      <Button className="button button--primary" onClick={onImageLightboxOpen}>
        {polyglot.t('learningPath.image.searchAndChose')}
      </Button>
      <p className="learning-path_input-information">
        {polyglot.t('learningPath.image.imageInformation')}
      </p>
    </div>
  );
};
ChoseImage.propTypes = {
  onImageLightboxOpen: PropTypes.func.isRequired,
};

const ChangeImage = props => {
  const { onImageLightboxOpen, savedImage } = props;

  const authors = savedImage.copyright.creators
    .concat(savedImage.copyright.rightsholders)
    .concat(savedImage.copyright.processors);
  return (
    <div>
      <div className="image-preview_image">
        <img
          role="presentation"
          src={savedImage.imageUrl}
          alt={savedImage.alttext}
        />
        <p className="learning-path_input-information">
          {polyglot.t('learningPath.image.imageInformation')}
        </p>
      </div>
      <div className="image-preview_information">
        <h2 className="image-preview_title">{savedImage.title}</h2>
        <div className="image-prieview_copyright-author">
          <b>{polyglot.t('learningPath.image.authors')}</b>
          <span>{authors.map(author => author.name).join(', ')}</span>
        </div>
        <Button
          className="button button--primary"
          onClick={onImageLightboxOpen}>
          {polyglot.t('learningPath.image.changeImage')}
        </Button>
      </div>
    </div>
  );
};

ChangeImage.propTypes = {
  onImageLightboxOpen: PropTypes.func.isRequired,
  savedImage: PropTypes.object.isRequired,
};

class LearningPathImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImages: false,
    };
  }

  render() {
    const {
      localFetchImages,
      learningPathTitle,
      fetchImage,
      input: { onChange },
      savedImage,
    } = this.props;

    const onImageLightboxClose = () => {
      this.setState({ displayImages: false });
    };
    const onImageLightboxOpen = evt => {
      evt.preventDefault();
      localFetchImages(
        { query: learningPathTitle, 'page-size': 16, page: 1 },
        true,
      );
      this.setState({ displayImages: true });
    };

    return (
      <div>
        <div className="learning-path-image">
          <label
            htmlFor="changeImage"
            className="label--medium-bold label--medium">
            {polyglot.t('learningPath.image.title')}
          </label>
          {savedImage && savedImage.id && !isEmpty(savedImage) ? (
            <ChangeImage
              onImageLightboxOpen={onImageLightboxOpen}
              savedImage={savedImage}
            />
          ) : (
            <ChoseImage onImageLightboxOpen={onImageLightboxOpen} />
          )}
        </div>
        <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll">
          <Lightbox
            display={this.state.displayImages}
            onClose={onImageLightboxClose}>
            <ImageSearch
              id="coverPhotoMetaUrl"
              onChange={onChange}
              closeLightBox={onImageLightboxClose}
              localFetchImages={localFetchImages}
              fetchImage={fetchImage}
            />
          </Lightbox>
        </div>
      </div>
    );
  }
}

LearningPathImage.propTypes = {
  localFetchImages: PropTypes.func.isRequired,
  learningPathTitle: PropTypes.string.isRequired,
  fetchImage: PropTypes.func.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  savedImage: PropTypes.object.isRequired,
};

const mapStateToProps = state =>
  Object.assign({}, state, {
    savedImage: state.imageSearch ? getSavedImage(state) : undefined,
  });

export default connect(mapStateToProps)(LearningPathImage);
