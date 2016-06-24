import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import isEqual from 'lodash/isEqual';
import SearchResultPager from '../../common/SearchResultPager';
import SearchForm from './LearningPathSearchForm';
import SearchResult from './LearningPathSearchResult';
import Masthead from '../../components/Masthead';
import { fetchLearningPaths } from '../../actions';
import { Wrapper, Content, Footer } from '../../common/Layout';

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
    const { learningPaths, query, lastPage, location: { pathname }, pushRoute } = this.props;
    let { page } = query;
    const navigateTo = (q) => {
      pushRoute({pathname, query: q});
    };

    const submitSearchQuery = q => navigateTo(Object.assign({}, query, { query: q, page: 1, tag: '' }));

    const changeSortOrder = sort => navigateTo(Object.assign({}, query, { sort }));

    const changeSearchTag = tag => navigateTo(Object.assign({}, query, { tag, page: 1 }));

    return (
      <Wrapper>
        <Content>
          <Masthead />
          <div className="page-header">
            <SearchForm
              {...query}
              onSortOrderChange={changeSortOrder}
              onSearchQuerySubmit={submitSearchQuery}
            />
          </div>
          <div className="search-results">
            {learningPaths.map(path =>
              (<SearchResult key={path.id} path={path} pushRoute={pushRoute} onTagSearchQuery={changeSearchTag} query={query} />)
            )}
            <SearchResultPager page={page} lastPage={lastPage} query={query} pathName="/learningpaths" />
          </div>
        </Content>
        <Footer />
      </Wrapper>
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
};

const mapStateToProps = (state) => {
  const query = state.learningPathQuery;
  const lastPage = Math.ceil(state.learningPathsTotalCount / (query.pageSize || 1));
  return Object.assign({}, state, { query, lastPage });
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchLearningPaths,
  pushRoute: (route) => routerActions.push(route)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathSearch);
