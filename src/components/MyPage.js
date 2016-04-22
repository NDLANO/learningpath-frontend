import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import { sortPrivateLearningPaths } from '../actions';
import LabeledIcon from './LabeledIcon';
import polyglot from '../i18n';

import { LearningPathDropdown } from './LearningPathDropdown';
import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';
import Lightbox from './Lightbox';
import CreateLearningPath from './CreateLearningPath';
import createLearningPath from '../actions/createLearningPath';

export class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCreatePath: false
    };

    this.onCreateLearningPathClick = this.onCreateLearningPathClick.bind(this);
  }

  onCreateLearningPathClick() {
    this.setState({
      displayCreatePath: true
    });
  }

  render() {
    const {learningPaths, dispatch} = this.props;
    const {lang} = this.context;
    const items = learningPaths.map(lp => {
      const title = titleI18N(lp, lang);
      const description = descriptionI18N(lp, lang);
      const duration = formatDuration(lp.duration, lang);
      const lastUpdated = formatDate(lp.lastUpdated, lang);

      return (
        <div key={lp.id} className='tile'>
          <div className='tile_context-menu'>
            <LearningPathDropdown dispatch={dispatch} learningPath={lp}/>
          </div>
          <h3 className='tile_hd'>
            <Link to={`/learningpaths/${lp.id}/edit`}>{title}</Link>
          </h3>
          <div className='tile_bd'>{description}</div>
          <div className='tile_ft'>
            <p>{duration}</p>
            <p>{polyglot.t('myPage.lastUpdated')} {lastUpdated}</p>
            <p>{polyglot.t('myPage.statusValue.' + lp.status)}</p>
          </div>
        </div>
      );
    });

    const sortOrderSelect = (
      <select value={sortBy} onChange={(evt) => dispatch(sortPrivateLearningPaths(evt.target.value))}>
        <option value='title'>{polyglot.t('myPage.order.title')}</option>
        <option value='lastUpdated'>{polyglot.t('myPage.order.lastUpdated')}</option>
        <option value='status'>{polyglot.t('myPage.order.status')}</option>
      </select>
    );

    let onCreateLearningPathSubmit = (values) =>
      dispatch(createLearningPath({
        title: [{title: values.title, language: lang}],
        description: [{description: values.description, language: lang}]
      }));

    let onLightboxClose = () => this.setState({displayCreatePath: false});

    return (<div>
      <div className='page-header'>
        <h2 className='page-header_name'>{polyglot.t('myPage.pageHeader')}</h2>
        <div className='page-header_ctrls'>
          {sortOrderSelect}
        </div>
      </div>
      <div className='tiles'>{items}</div>
      <div>
        <button className='cta-link new-learningpath-button' onClick={this.onCreateLearningPathClick}>
          <LabeledIcon.Add labelText={polyglot.t('myPage.newBtn')}/>
        </button>
        <Lightbox display={this.state.displayCreatePath} onClose={onLightboxClose}>
          <CreateLearningPath onSubmit={onCreateLearningPathSubmit} />
        </Lightbox>
      </div>
    </div>);
  }
}

MyPage.propTypes = {
  sortBy: PropTypes.oneOf(['title', 'lastUpdated', 'status']).isRequired,
  dispatch: PropTypes.func.isRequired,
  learningPaths: PropTypes.array
};

MyPage.defaultProps = { learningPaths: [], sortBy: 'title' };

MyPage.contextTypes = {
  lang: PropTypes.string.isRequired
};

const sortPaths = (paths, field, state) => {
  switch (field) {
  case 'title':
    return sortBy(paths, (p) => titleI18N(p, state.lang));

  case 'lastUpdated':
    return reverse(sortBy(paths, field));

  default:
    return sortBy(paths, field);
  }
};

const mapStateToProps = (state) => {
  const sortBy = state.privateLearningPathsSortBy || 'title';
  const learningPaths = sortPaths(state.learningPaths, sortBy, state);
  return Object.assign({}, state, { learningPaths, sortBy });
};

export { mapStateToProps };

export default connect(mapStateToProps)(MyPage);
