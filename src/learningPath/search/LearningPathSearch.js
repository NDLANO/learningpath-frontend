/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import defined from 'defined';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { routerActions } from 'react-router-redux';
import upperFirst from 'lodash/upperFirst';
import polyglot from '../../i18n';
import LinkPager from '../../common/pager/LinkPager';
import SearchForm from './LearningPathSearchForm';
import SearchResult from './LearningPathSearchResult';
import Masthead from '../../common/Masthead';
import { searchLearningPaths } from './learningPathSearchActions';
import { Wrapper, OneColumn, Footer } from '../../common/Layout';
import {
  getLearningPathSearchResult,
  getLearningPathSearchTotalCount,
} from './learningPathSearchSelectors';

class LearningPathSearch extends React.Component {
  static mapDispatchToProps = {
    localSearchLearningPaths: searchLearningPaths,
    pushRoute: route => routerActions.push(route),
  };

  static fetchData(props) {
    const { localSearchLearningPaths, location } = props;
    const query = queryString.parse(location.search);
    const queryWithSort = query.sort
      ? query
      : { ...query, sort: '-lastUpdated' };
    return localSearchLearningPaths(queryWithSort);
  }

  componentWillMount() {
    LearningPathSearch.fetchData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.props.localSearchLearningPaths(
        queryString.parse(nextProps.location.search),
      );
    }
  }

  render() {
    const {
      learningPaths,
      lastPage,
      location: { pathname, search },
      pushRoute,
    } = this.props;
    const query = queryString.parse(search);
    const page = query.page ? parseInt(query.page, 10) : 1;
    const navigateTo = q => {
      pushRoute({ pathname, search: `?${queryString.stringify(q)}` });
    };

    const submitSearchQuery = (q, sort) =>
      navigateTo(
        Object.assign({}, query, { query: q, page: 1, tag: '', sort }),
      );

    const changeSortOrder = sort =>
      navigateTo(Object.assign({}, query, { sort }));

    const changeSearchTag = tag =>
      navigateTo(Object.assign({}, query, { tag, page: 1 }));

    const acitveTagTitle = query.tag ? (
      <h1 className="search-results_active-tag">{upperFirst(query.tag)}</h1>
    ) : (
      ''
    );

    const queryWithSort = query.sort
      ? query
      : { ...query, sort: '-lastUpdated' };

    return (
      <Wrapper>
        <Helmet title={polyglot.t('learningPathSearch.title')} />
        <OneColumn className={'one-colum--white-bg'}>
          <Masthead />
          <div className="page-header">
            <SearchForm
              {...query}
              onSortOrderChange={changeSortOrder}
              onSearchQuerySubmit={submitSearchQuery}
            />
          </div>
          <div className="search-results">
            {acitveTagTitle}
            {learningPaths.map(path => (
              <SearchResult
                key={path.id}
                path={path}
                pushRoute={pushRoute}
                onTagSearchQuery={changeSearchTag}
                query={query}
              />
            ))}
            <LinkPager
              page={page}
              lastPage={lastPage}
              query={queryWithSort}
              pathName="/learningpaths"
            />
          </div>
        </OneColumn>
        <Footer />
      </Wrapper>
    );
  }
}

LearningPathSearch.propTypes = {
  localSearchLearningPaths: PropTypes.func.isRequired,
  learningPaths: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }),
  lastPage: PropTypes.number.isRequired,
  pushRoute: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
  const query = queryString.parse(props.location.search);
  const pageSize = defined(query.pageSize, '10');
  const lastPage = Math.ceil(
    getLearningPathSearchTotalCount(state) / parseInt(pageSize, 10),
  );
  return Object.assign(
    {},
    {
      lastPage,
      learningPaths: getLearningPathSearchResult(state),
    },
  );
};

export default connect(mapStateToProps, LearningPathSearch.mapDispatchToProps)(
  LearningPathSearch,
);
