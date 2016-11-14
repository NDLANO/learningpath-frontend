/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import ImageSearchForm from './ImageSearchForm';
import ImageSearchResult from './ImageSearchResult';
import ButtonPager from '../common/pager/ButtonPager';
import { changeImageSearchQuery, setSavedImage } from './imageActions';

export function Images(props) {
  const {
    images,
    localFetchImages,
    closeLightBox,
    onChange,
    imageSearchQuery,
    localChangeImageSearchQuery,
    fetchImage,
    selectedImage,
    lastPage,
    totalCount,
    localSetSavedImage,
  } = props;

  if (!images) {
    return null;
  }
  const onImageClick = (evt, image) => {
    evt.preventDefault();
    if (image.id !== selectedImage.id) {
      fetchImage(image.id);
    }
  };
  const submitImageSearchQuery = (evt, q) => {
    evt.preventDefault();
    localFetchImages(q, false);
  };
  const base = '/images';

  const onSaveImage = (evt, image) => {
    closeLightBox();
    const coverPhotoMetaUrl = `${window.config.ndlaImageApiUrl}${base}/${image.id}`;
    onChange(coverPhotoMetaUrl);
    localSetSavedImage(image);
  };
  return (
    <div>
      <div>
        <ImageSearchForm onSubmit={submitImageSearchQuery} query={imageSearchQuery} localChangeImageSearchQuery={localChangeImageSearchQuery} totalCount={totalCount} />
        <div className="image_list">
          {images.map(image =>
            <ImageSearchResult key={image.id} image={image} onImageClick={onImageClick} selectedImage={selectedImage} onSaveImage={onSaveImage} />
          )}
        </div>
        <ButtonPager page={imageSearchQuery.page} lastPage={lastPage} query={imageSearchQuery} pagerAction={localFetchImages} />
      </div>
    </div>
  );
}

Images.propTypes = {
  images: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  closeLightBox: PropTypes.func.isRequired,
  imageSearchQuery: PropTypes.object.isRequired,
  localFetchImages: PropTypes.func.isRequired,
  localChangeImageSearchQuery: PropTypes.func.isRequired,
  fetchImage: PropTypes.func.isRequired,
  selectedImage: PropTypes.object,
  lastPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  localSetSavedImage: PropTypes.func.isRequired,
};

Images.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {
  images: state.imageSearch.images.results,
  selectedImage: state.imageSearch.selectedImage,
  lastPage: Math.ceil(state.imageSearch.images.totalCount / (state.imageSearch.imageSearchQuery['page-size'] || 1)),
  totalCount: get(state, 'imageSearch.images.totalCount', 0),
  imageSearchQuery: get(state, 'imageSearch.imageSearchQuery', { query: '', page: 1, 'page-size': 16 }),
});

const mapDispatchToProps = {
  localChangeImageSearchQuery: changeImageSearchQuery,
  localSetSavedImage: setSavedImage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Images);
