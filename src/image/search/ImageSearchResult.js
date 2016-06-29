import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Image from '../Image';
export default function ImageSearch(props) {
  const { image, onImageClick, currentImage, onSaveImage } = props;
  const activeClassName = () => classNames({
    'image_list-item': true,
    'image_list-item--active': currentImage.id === image.id

  });

  return (
    <div key={image.id} className={activeClassName()}>
      <div className="image_list-item-inner">
        <img role="presentation" src={image.previewUrl} onClick={(evt) => onImageClick(evt, image)} />
      </div>
      {currentImage.id === image.id ? <Image image={currentImage} onSaveImage={(evt) => onSaveImage(evt, currentImage)} /> : ''}
    </div>
  );
}

ImageSearch.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
  currentImage: PropTypes.object,
  onSaveImage: PropTypes.func.isRequired
};
