import React, { PropTypes } from 'react';
import Images from '../../image/Images';
import Lightbox from '../../components/Lightbox';
import polyglot from '../../i18n';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

const ChoseImage = (props) => {
  const { onImageLightboxOpen } = props;
  return (
    <div>
      <button className="button button--primary" onClick={(evt) => onImageLightboxOpen(evt)}>
        {polyglot.t('learningPath.image.searchAndChose')}
      </button>
      <p className="learning-path_input-information">{polyglot.t('learningPath.image.imageInformation')}</p>
    </div>
  );
};
ChoseImage.propTypes = {
  onImageLightboxOpen: PropTypes.func.isRequired,
};

const ChangeImage = (props) => {
  const { onImageLightboxOpen, currentImage } = props;
  return (
    <div>
      <div className="image-preview_image">
        <img role="presentation" src={currentImage.images.full.url} />
        <p className="learning-path_input-information">{polyglot.t('learningPath.image.imageInformation')}</p>
      </div>
      <div className="image-preview_information">
        <h2 className="image-preview_title">{currentImage.titles[0].title}</h2>
        <div className="image-prieview_copyright-author">
          <b>
            {polyglot.t('learningPath.image.authors')}
          </b>
          <span>
            {currentImage.copyright.authors.map(author =>
              <span key={author.name}>{author.name}, </span>
            )}
          </span>
        </div>
        <button className="button button--primary" onClick={(evt) => onImageLightboxOpen(evt)}>
          {polyglot.t('learningPath.image.changeImage')}
        </button>
      </div>
    </div>
  );
};

ChangeImage.propTypes = {
  onImageLightboxOpen: PropTypes.func.isRequired,
  currentImage: PropTypes.object.isRequired,
};

class LearningPathImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayImages: false
    };
  }
  render() {
    const {
      onChoseImage,
      learningPathTitle,
      fetchImage,
      onChange,
      currentImage
    } = this.props;

    const onImageLightboxClose = () => {
      this.setState({displayImages: false});
    };
    const onImageLightboxOpen = (evt) => {
      evt.preventDefault();
      console.log(learningPathTitle);
      onChoseImage({query: learningPathTitle, 'page-size': 16, page: 1}, true);
      this.setState({displayImages: true});
    };

    return (
      <div>
        <div className="learning-path-image">
          <label className="label--medium-bold label--medium">{polyglot.t('learningPath.image.title')}</label>
          {currentImage && !isEmpty(currentImage) ? <ChangeImage onImageLightboxOpen={onImageLightboxOpen} currentImage={currentImage} /> : <ChoseImage onImageLightboxOpen={onImageLightboxOpen} />}
        </div>
        <div className="lightbox_image-preview">
          <Lightbox display={this.state.displayImages} onClose={onImageLightboxClose}>
            <Images
              id="coverPhotoMetaUrl" onChange={onChange} closeLightBox={onImageLightboxClose} imageSearch={onChoseImage} fetchImage={fetchImage}
            />
          </Lightbox>
        </div>
      </div>
    );
  }
}

LearningPathImage.propTypes = {
  onChoseImage: PropTypes.func.isRequired,
  learningPathTitle: PropTypes.string.isRequired,
  fetchImage: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  currentImage: PropTypes.object.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  currentImage: state.images ? state.images.currentImage : undefined
});

export default connect(mapStateToProps)(LearningPathImage);
