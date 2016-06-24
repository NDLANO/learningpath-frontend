import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImageSearch from './search/ImageSearch';
import ImageSearchResult from './search/ImageSearchResult';
import ImageSearchPager from './search/ImageSearchPager';
import { changeImageSearchQuery } from '../actions';
import Image from './Image';
export function Images(props) {
  const {
    images,
    imageSearch,
    closeLightBox,
    onChange,
    imageSearchQuery,
    localChangeImageSearchQuery,
    fetchImage,
    currentImage
  } = props;

  if (!images) {
    return null;
  }
  const onImageClick = (evt, image) => {
    if (image.id !== currentImage.id) {
      fetchImage(image.id);
    }
  };

  const submitImageSearchQuery = (evt, q) => {
    evt.preventDefault();
    imageSearch(q);
  };
  const base = '/images';

  const onSaveImage = (evt, image) => {
    closeLightBox();
    const coverPhotoMetaUrl = `${window.NDLA_API_URL}${base}/${image.id}`;
    onChange(coverPhotoMetaUrl);
  };

  return (
    <div>
      <ImageSearch onSubmit={submitImageSearchQuery} query={imageSearchQuery} localChangeImageSearchQuery={localChangeImageSearchQuery} />
      <div className="image_list">
        {images.map((image, index) => {
          if (image.isPreview) {
            return <Image key={index} image={currentImage} onSaveImage={(evt) => onSaveImage(evt, currentImage)} />;
          }
          return <ImageSearchResult key={index} image={image} onImageClick={onImageClick} currentImage={currentImage} />;
        })}
        <ImageSearchPager page={imageSearchQuery.page} lastPage={5} query={imageSearchQuery} imageSearch={imageSearch} />
      </div>
    </div>
  );
}

Images.propTypes = {
  images: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  closeLightBox: PropTypes.func.isRequired,
  imageSearchQuery: PropTypes.object.isRequired,
  imageSearch: PropTypes.func.isRequired,
  localChangeImageSearchQuery: PropTypes.func.isRequired,
  fetchImage: PropTypes.func.isRequired,
  currentImage: PropTypes.object
};

Images.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  const images = state.images.images.results;
  const currentImage = state.images.currentImage;
  if (currentImage.id) {
    const imageIndex = images.findIndex((i) => i.id === currentImage.id);
    const localImages = images.slice();
    localImages.splice(imageIndex + 1, 0, currentImage);
    return Object.assign({}, state, {
      images: localImages,
      currentImage
    });
  }
  return Object.assign({}, state, {
    images: state.images.images.results,
    currentImage
  });
};

const mapDispatchToProps = {
  localChangeImageSearchQuery: changeImageSearchQuery
};
export default connect(mapStateToProps, mapDispatchToProps)(Images);
