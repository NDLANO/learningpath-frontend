import React, { PropTypes } from 'react';
import classNames from 'classnames';
export default function ImageSearch(props) {
  const { image, onImageClick, currentImage } = props;
  const activeClassName = () => classNames({
    'image_list-item': true,
    'image_list-item--active': currentImage.id === image.id

  });

  return (
    <div key={image.id} className={activeClassName()}>
      <div className="image_list-item-inner">
        <img role="presentation" src={image.previewUrl} onClick={(evt) => onImageClick(evt, image)} />
      </div>
    </div>
  );
}

ImageSearch.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
  currentImage: PropTypes.object
};
