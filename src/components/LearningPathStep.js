import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { oembedI18N, oembedUrlI18N } from '../util/i18nFieldFinder';
import classNames from 'classnames';


export function LearningPathStep ({step}, {lang}) {
  let iframe = oembedI18N(step, lang);
  let url = oembedUrlI18N(step, lang);
  console.log(step);
  const hasWidthAndHeight = iframe != undefined ? (iframe.indexOf('width') > -1) && (iframe.indexOf('height') > -1) : false;

  const divClassname = (hasWidthAndHeight) => classNames({
    'learning-step': true,
    'no-defined-height-width': hasWidthAndHeight === true
  });

  return (
    <div className={divClassname(hasWidthAndHeight)} dangerouslySetInnerHTML={{__html: iframe}}/>
  );
}

LearningPathStep.propTypes = {
  step: PropTypes.object.isRequired
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  step: state.learningPathStep
});

export default connect(mapStateToProps)(LearningPathStep);
