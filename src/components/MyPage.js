import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export function MyPage ({learningPaths, lang}) {
  const items = learningPaths.map(lp => {
    const title = lp.title.find(d => d.language === lang).title;
    const description = lp.description.find(d => d.language === lang).description;
    return (
      <div key={lp.id}>
        <h5>
          <Link to={`/path/${lp.id}`}>{title}</Link>
        </h5>
        <p>{description}</p>
      </div>
    );
  });

  return (<div>{items}</div>);
}

MyPage.propTypes = {
  lang: PropTypes.string.isRequired,
  learningPaths: PropTypes.array
};

MyPage.defaultProps = { learningPaths: [] };

const select = (state) => Object.assign({}, state, {
  learningPaths: state.privateLearningPaths
});

export default connect(select)(MyPage);
