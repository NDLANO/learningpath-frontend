import React, { PropTypes } from 'react';
// import defined from 'defined';
import polyglot from '../i18n';
// import { tagsI18N } from '../util/i18nFieldFinder';
export default function PreviewImage({ image, onSaveImage }, {lang}) {
  const tags = image.tags.filter(tag => tag.language === lang); // TODO: Use tagsI18N when imageAPI changes
  return (
    <div className="image-preview">
      <div className="image-preview_image">
        <img role="presentation" src={image.images.full.url} />
      </div>
      <div className="image-preview_information">
        <h2 className="image-preview_title">{image.titles[0].title}</h2>
        <div className="image-prieview_copyright-author">
          <b className="image-preview_text--left">
            {polyglot.t('learningPath.image.authors')}
          </b>
          <span className="image-preview_text--right">
            {image.copyright.authors.reduce((prev, curr) => `${prev.name}, ${curr.name}`)}
          </span>
        </div>
        <div className="image-prieview_license">
          <b className="image-preview_text--left">
            {polyglot.t('learningPath.image.copyright')}
          </b>
          <span className="image-preview_text--right">
            {image.copyright.license.description}
          </span>
        </div>
        <div className="image-preview_tags">
          <b>{polyglot.t('learningPath.image.tags')}</b>
          {tags.map(tag =>
            <span key={tag.tag} className="tag_item">{tag.tag}</span>
          )}
        </div>
        <button className="button button--primary button--block" onClick={onSaveImage}>{polyglot.t('learningPath.image.choseImage')}</button>
      </div>
      <div className="clear"></div>
    </div>
  );
}

PreviewImage.propTypes = {
  image: PropTypes.object.isRequired,
  onSaveImage: PropTypes.func.isRequired
};

PreviewImage.contextTypes = {
  lang: PropTypes.string.isRequired
};
