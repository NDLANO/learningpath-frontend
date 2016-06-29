import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImageSearch from './search/ImageSearch';
import ImageSearchResult from './search/ImageSearchResult';
import ImageSearchPager from './search/ImageSearchPager';
import { changeImageSearchQuery } from './imageActions';
import get from 'lodash/get';
export function Images(props) {
  const {
    images,
    imageSearch,
    closeLightBox,
    onChange,
    imageSearchQuery,
    localChangeImageSearchQuery,
    fetchImage,
    currentImage,
    lastPage,
    totalCount,
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
    console.log(q);
    imageSearch(q, false);
  };
  const base = '/images';

  const onSaveImage = (evt, image) => {
    closeLightBox();
    const coverPhotoMetaUrl = `${window.NDLA_API_URL}${base}/${image.id}`;
    onChange(coverPhotoMetaUrl);
  };
  return (
    <div>
      <div>
        <ImageSearch onSubmit={submitImageSearchQuery} query={imageSearchQuery} localChangeImageSearchQuery={localChangeImageSearchQuery} totalCount={totalCount} />
        <div className="image_list">
          {images.map((image) =>
            <ImageSearchResult key={image.id} image={image} onImageClick={onImageClick} currentImage={currentImage} onSaveImage={onSaveImage} />
          )}
        </div>
        <ImageSearchPager page={imageSearchQuery.page} lastPage={lastPage} query={imageSearchQuery} imageSearch={imageSearch} />
      </div>
    </div>
  );
}

Images.propTypes = {
  images: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  closeLightBox: PropTypes.func.isRequired,
  imageSearchQuery: PropTypes.object.isRequired,
  imageSearch: PropTypes.func.isRequired,
  localChangeImageSearchQuery: PropTypes.func.isRequired,
  fetchImage: PropTypes.func.isRequired,
  currentImage: PropTypes.object,
  lastPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

Images.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  images: state.images.images.results,
  currentImage: state.images.currentImage,
  lastPage: Math.ceil(state.images.images.totalCount / (state.imageSearchQuery['page-size'] || 1)),
  totalCount: get(state, 'images.images.totalCount', 0),
  imageSearchQuery: get(state, 'imageSearchQuery', {query: '', page: 1, 'page-size': 16})
});

const mapDispatchToProps = {
  localChangeImageSearchQuery: changeImageSearchQuery
};
export default connect(mapStateToProps, mapDispatchToProps)(Images);
