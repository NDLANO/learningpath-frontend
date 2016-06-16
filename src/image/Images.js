import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImageSearch from './search/ImageSearch';
export function Images(props) {
  const {
    images,
    onChange,
    closeLightBox,
  } = props;
  const onImageClick = (image) => {
    onChange(image.previewUrl);
    closeLightBox();
  };
  return (
    <div>
      <ImageSearch />
      <div className="image_list">
        {images.map((image) =>
          <div key={image.id} className="image_list-item">
            <div className="image_list-item-inner">
              <img role="presentation" src={image.previewUrl} onClick={() => onImageClick(image)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Images.propTypes = {
  images: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  closeLightBox: PropTypes.func.isRequired,
};

Images.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  images: state.images.images,
});

export default connect(mapStateToProps)(Images);
