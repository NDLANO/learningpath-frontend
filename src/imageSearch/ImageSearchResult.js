import React, { PropTypes } from 'react';
import classNames from 'classnames';
import PreviewImage from './PreviewImage';
export default function ImageSearch({ image, onImageClick, selectedImage, onSaveImage }) {
  const activeClassName = () => classNames({
    'image_list-item': true,
    'image_list-item--active': selectedImage.id === image.id,
  });

  return (
    <div key={image.id} className={activeClassName()}>
      <div className="image_list-item-inner">
        <img role="presentation" src={image.previewUrl} onClick={(evt) => onImageClick(evt, image)} />
      </div>
      {selectedImage.id === image.id ? <PreviewImage image={selectedImage} onSaveImage={(evt) => onSaveImage(evt, selectedImage)} /> : ''}
    </div>
  );
}

ImageSearch.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
  selectedImage: PropTypes.object,
  onSaveImage: PropTypes.func.isRequired,
};
