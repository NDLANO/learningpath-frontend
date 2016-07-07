import React, { PropTypes } from 'react';
import polyglot from '../i18n';
import Icon from '../common/Icon';

class ImageSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showTotalCount: true};
  }
  render() {
    const { onSubmit, query, localChangeImageSearchQuery, totalCount } = this.props;
    const textQuery = query.query;
    const onQueryChange = (evt) => {
      const newQuery = {
        query: evt.target.value,
        'page-size': 16,
        page: textQuery === evt.target.value ? query.page : 1,
      };

      this.setState({showTotalCount: false});
      localChangeImageSearchQuery(newQuery);
    };
    const submitImageSearchQuery = (evt) => {
      evt.preventDefault();
      this.setState({showTotalCount: true});
      onSubmit(evt, query);
    };
    const onKeyPress = (evt) => {
      if (evt.key === 'Enter') {
        submitImageSearchQuery(evt);
      }
    };

    const totalCountText = totalCount === 1 ? polyglot.t('learningPath.image.imageSearchOneTotalCount', {textQuery}) : polyglot.t('learningPath.image.imageSearchTotalCount', {textQuery, totalCount});

    return (
      <div className="image-search">
        <h2>{polyglot.t('learningPath.image.search')}</h2>
        <div className="image-search_form">
          <input
            type="text" value={textQuery} onChange={onQueryChange}
            onKeyPress={onKeyPress} placeholder={polyglot.t('learningPath.image.searchPlaceholder')} className="image-search_form-query"
          />
          <button className="image-search_form-button" onClick={submitImageSearchQuery}><Icon.Search /></button>
        </div>
        <div className="image-search_border" />
        <div className="image-search_text">
          {this.state.showTotalCount ? <p>{totalCountText}</p> : ''}
        </div>
      </div>
    );
  }
}

ImageSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  localChangeImageSearchQuery: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
};

export default (ImageSearch);
