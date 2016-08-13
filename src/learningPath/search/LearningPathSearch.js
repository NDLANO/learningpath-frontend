/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import defined from 'defined';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import LinkPager from '../../common/pager/LinkPager';
import SearchForm from './LearningPathSearchForm';
import SearchResult from './LearningPathSearchResult';
import Masthead from '../../common/Masthead';
import { searchLearningPaths } from './learningPathSearchActions';
import { Wrapper, Content, Footer } from '../../common/Layout';
import { getLearningPathSearchResult } from './learningPathSearchSelectors';

const LearningPathSearch = (props) => {
  const { learningPaths, lastPage, location: { pathname, query }, pushRoute } = props;
  const page = query.page ? parseInt(query.page, 10) : 1;
  const navigateTo = (q) => {
    pushRoute({ pathname, query: q });
  };

  const submitSearchQuery = (q, sort) => navigateTo(Object.assign({}, query, { query: q, page: 1, tag: '', sort }));

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
          <LinkPager page={page} lastPage={lastPage} query={query} pathName="/learningpaths" />
        </div>
      </Content>
      <Footer />
    </Wrapper>
  );
};

LearningPathSearch.propTypes = {
  searchLearningPaths: PropTypes.func.isRequired,
  learningPaths: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
  }),
  lastPage: PropTypes.number.isRequired,
  pushRoute: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  const pageSize = defined(props.location.query.pageSize, '10');
  const lastPage = Math.ceil(state.learningPathsTotalCount / parseInt(pageSize, 10));
  return Object.assign({}, {
    lastPage,
    learningPaths: getLearningPathSearchResult(state),
  });
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  searchLearningPaths,
  pushRoute: (route) => routerActions.push(route),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathSearch);
