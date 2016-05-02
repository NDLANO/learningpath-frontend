import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import { setMyLearningPathsSortOrder, updateLearningPathStatus, deleteLearningPath, createLearningPath } from '../actions';
import LabeledIcon from './LabeledIcon';
import polyglot from '../i18n';

import { LearningPathDropdown } from './LearningPathDropdown';
import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';
import Lightbox from './Lightbox';
import CreateLearningPath from './CreateLearningPath';

export class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCreatePath: false
    };
  }

  onCreateLearningPathClick() {
    this.setState({
      displayCreatePath: true
    });
  }

  render() {
    const {learningPaths, sortKey, setSortKey, deletePath, updatePathStatus, createPath} = this.props;
    const {lang} = this.context;
    const onCreateLearningPathClick = this.onCreateLearningPathClick.bind(this);
    const items = learningPaths.map(lp => {
      const title = titleI18N(lp, lang);
      const description = descriptionI18N(lp, lang);
      const duration = formatDuration(lp.duration, lang);
      const lastUpdated = formatDate(lp.lastUpdated, lang);

      const onDropDownSelect = actionType => {
        switch (actionType) {
        case 'delete':
          deletePath(lp.id);
          break;
        case 'publish':
          updatePathStatus(lp.id, 'PUBLISHED');
          break;
        case 'unpublish':
          updatePathStatus(lp.id, 'PRIVATE');
          break;
        }
      };

      return (
        <div key={lp.id} className='tile'>
          <div className='tile_context-menu'>
            <LearningPathDropdown onSelect={onDropDownSelect} learningPath={lp}/>
          </div>
          <h3 className='tile_hd'>
            <Link to={`/learningpaths/${lp.id}`}>{title}</Link>
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
      <select value={sortKey} onChange={(evt) => setSortKey(evt.target.value)}>
        <option value='title'>{polyglot.t('myPage.order.title')}</option>
        <option value='-lastUpdated'>{polyglot.t('myPage.order.newest')}</option>
        <option value='lastUpdated'>{polyglot.t('myPage.order.oldest')}</option>
        <option value='status'>{polyglot.t('myPage.order.status')}</option>
      </select>
    );

    let onCreateLearningPathSubmit = values => createPath({
      title: [{title: values.title, language: lang}],
      description: [{description: values.description, language: lang}],
      duration: 1
    });

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
        <button className='cta-link new-learningpath-button' onClick={onCreateLearningPathClick}>
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
  sortKey: PropTypes.oneOf(['title', 'lastUpdated', '-lastUpdated', 'status']),
  setSortKey: PropTypes.func.isRequired,
  deletePath: PropTypes.func.isRequired,
  updatePathStatus: PropTypes.func.isRequired,
  createPath: PropTypes.func.isRequired,
  learningPaths: PropTypes.array
};

MyPage.defaultProps = { learningPaths: [], sortKey: 'title' };

MyPage.contextTypes = {
  lang: PropTypes.string.isRequired
};

const sortPaths = (paths, field, state) => {
  switch (field) {
  case 'title':
    return sortBy(paths, (p) => titleI18N(p, state.lang));

  case 'lastUpdated':
    return sortBy(paths, field);
    
  case '-lastUpdated':
    return reverse(sortBy(paths, 'lastUpdated'));

  default:
    return sortBy(paths, field);
  }
};

export function mapStateToProps (state) {
  const sortKey = state.myLearningPathsSortOrder || 'title';
  const learningPaths = sortPaths(state.learningPaths, sortKey, state);
  return Object.assign({}, state, { learningPaths, sortKey });
}

const mapDispatchToProps = {
  setSortKey: setMyLearningPathsSortOrder,
  deletePath: deleteLearningPath,
  updatePathStatus: updateLearningPathStatus,
  createPath: createLearningPath
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
