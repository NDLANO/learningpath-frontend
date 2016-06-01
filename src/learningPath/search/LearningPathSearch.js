import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import isEqual from 'lodash/isEqual';
import SearchResultPager from '../../common/SearchResultPager';
import SearchForm from './LearningPathSearchForm';
import SearchResult from './LearningPathSearchResult';
import Masthead from '../../components/Masthead';
import { fetchLearningPaths, closeSidebars } from '../../actions';

class LearningPathSearch extends Component {

  componentWillMount() {
    this.props.fetchLearningPaths();
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(newProps.query, this.props.query)) {
      newProps.fetchLearningPaths();
    }
  }


  render() {
    const { learningPaths, query, lastPage, location: { pathname }, pushRoute, closeBothSidebars } = this.props;
    let { page } = query;

    const navigateTo = (q) => {
      pushRoute({pathname, query: q});
    };

    const submitSearchQuery = q => navigateTo(Object.assign({}, query, { query: q, page: 1 }));

    const changeSortOrder = sort => navigateTo(Object.assign({}, query, { sort }));

    return (
      <div>
        <Masthead />
        <div className="page-header" onClick={closeBothSidebars}>
          <SearchForm
            {...query}
            onSortOrderChange={changeSortOrder}
            onSearchQuerySubmit={submitSearchQuery}
          />
        </div>

        <div className="search-results" onClick={closeBothSidebars}>
          {learningPaths.map(path =>
            (<SearchResult key={path.id} path={path} />)
          )}
          <SearchResultPager page={page} lastPage={lastPage} query={query} />
        </div>
      </div>
    );
  }
}

LearningPathSearch.propTypes = {
  fetchLearningPaths: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  learningPaths: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
  lastPage: PropTypes.number.isRequired,
  pushRoute: PropTypes.func.isRequired,
  closeBothSidebars: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const query = state.learningPathQuery;
  const lastPage = Math.ceil(state.learningPathsTotalCount / (query.pageSize || 1));
  return Object.assign({}, state, { query, lastPage });
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchLearningPaths,
  closeBothSidebars: closeSidebars,
  pushRoute: (route) => routerActions.push(route)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathSearch);
