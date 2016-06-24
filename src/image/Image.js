import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterFieldsByLanguage } from '../util/i18nFieldFinder';
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }
  componentDidMount() {
    if (this.state.height !== this.wrapper.clientHeight) {
      this.setState({height: this.wrapper.clientHeight});
    }
  }
  setWrapperRef(el) {
    this.wrapper = el;
  }
  render() {
    const {
      image,
      onSaveImage
    } = this.props;
    const tags = filterFieldsByLanguage(image.tags, 'nb');
    return (
      <div className="image-preview" ref={this.setWrapperRef}>
        <div className="image-preview_image">
          <img role="presentation" src={image.images.full.url} />
        </div>
        <div className="image-preview_information">
          <h2 className="image-preview_title">{image.titles[0].title}</h2>
          <div className="image-prieview_copyright-author">
            <b className="image-preview_text--left">
              Opphav
            </b>
            <span className="image-preview_text--right">
              {image.copyright.authors.map(author =>
                <span key={author.name}>{author.name}, </span>
              )}
            </span>
          </div>
          <div className="image-prieview_license">
            <b className="image-preview_text--left">
              Lisens
            </b>
            <span className="image-preview_text--right">
              {image.copyright.license.description}
            </span>
          </div>
          <div className="image-preview_tags">
            <b>Tagger</b>
            {tags.map(tag =>
              <span key={tag.tag} className="search-result_tag">{tag.tag}</span>
            )}
          </div>
          <button className="button button--primary button--block" onClick={onSaveImage}>Bruk bildet</button>
        </div>
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
  onSaveImage: PropTypes.func.isRequired
};

Image.contextTypes = {
  lang: PropTypes.string.isRequired
};

export default connect(state => state)(Image);
