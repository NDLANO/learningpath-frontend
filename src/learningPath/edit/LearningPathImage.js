import React, { PropTypes } from 'react';
import ImageSearch from '../../imageSearch/ImageSearch';
import Lightbox from '../../components/Lightbox';
import polyglot from '../../i18n';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Button from '../../common/buttons/Button';
const ChoseImage = (props) => {
  const { onImageLightboxOpen } = props;
  return (
    <div>
      <Button className="button button--primary" onClick={onImageLightboxOpen}>
        {polyglot.t('learningPath.image.searchAndChose')}
      </Button>
      <p className="learning-path_input-information">{polyglot.t('learningPath.image.imageInformation')}</p>
    </div>
  );
};
ChoseImage.propTypes = {
  onImageLightboxOpen: PropTypes.func.isRequired,
};

const ChangeImage = (props) => {
  const { onImageLightboxOpen, selectedImage } = props;
  return (
    <div>
      <div className="image-preview_image">
        <img role="presentation" src={selectedImage.images.full.url} />
        <p className="learning-path_input-information">{polyglot.t('learningPath.image.imageInformation')}</p>
      </div>
      <div className="image-preview_information">
        <h2 className="image-preview_title">{selectedImage.titles[0].title}</h2>
        <div className="image-prieview_copyright-author">
          <b>
            {polyglot.t('learningPath.image.authors')}
          </b>
          <span>
            {selectedImage.copyright.authors.map((author) =>
              author.name
            ).join(', ')}
          </span>
        </div>
        <Button className="button button--primary" onClick={onImageLightboxOpen}>
          {polyglot.t('learningPath.image.changeImage')}
        </Button>
      </div>
    </div>
  );
};

ChangeImage.propTypes = {
  onImageLightboxOpen: PropTypes.func.isRequired,
  selectedImage: PropTypes.object.isRequired,
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
      localFetchImages,
      learningPathTitle,
      fetchImage,
      onChange,
      selectedImage
    } = this.props;

    const onImageLightboxClose = () => {
      this.setState({displayImages: false});
    };
    const onImageLightboxOpen = (evt) => {
      evt.preventDefault();
      localFetchImages({query: learningPathTitle, 'page-size': 16, page: 1}, true);
      this.setState({displayImages: true});
    };

    return (
      <div>
        <div className="learning-path-image">
          <label className="label--medium-bold label--medium">{polyglot.t('learningPath.image.title')}</label>
          {
            selectedImage && !isEmpty(selectedImage) ?
              <ChangeImage onImageLightboxOpen={onImageLightboxOpen} selectedImage={selectedImage} /> : <ChoseImage onImageLightboxOpen={onImageLightboxOpen} />
          }
        </div>
        <div className="lightbox_image-preview">
          <Lightbox display={this.state.displayImages} onClose={onImageLightboxClose}>
            <ImageSearch
              id="coverPhotoMetaUrl" onChange={onChange} closeLightBox={onImageLightboxClose} localFetchImages={localFetchImages} fetchImage={fetchImage}
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
  onChange: PropTypes.func.isRequired,
  selectedImage: PropTypes.object.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  selectedImage: state.imageSearch ? state.imageSearch.selectedImage : undefined
});

export default connect(mapStateToProps)(LearningPathImage);
