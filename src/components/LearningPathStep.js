import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { oembedI18N, oembedUrlI18N } from '../util/i18nFieldFinder';

let resizeIframe = (iframes) => {
  return (evt) => {
    if (iframes === undefined) { return; }
    if (!evt.data.height) { return; }
    let iframe = (function (iframes) {
      for (let i=0, len=iframes.length; i < len; i++) {
        if (iframes[i].contentWindow === evt.source) {
          return iframes[i];
        }
      }
    }(iframes));

    if (!iframe) { return; }

    if ((evt.data.height + 25) > parseInt(iframe.style.height, 10) || iframe.style.height === '') {
      iframe.style.height = (evt.data.height + 25) + 'px';
    }
  };
};


const isNDLASource = (url) => /http:\/\/ndla.no/.test(url);

export class LearningPathStep extends React.Component {

  checkIframe (props) {
    let {step} = props;
    let {lang} = this.context;
    let url = oembedUrlI18N(step, lang);

    if (isNDLASource(url) && ReactDOM.findDOMNode(this) != null){
      if (ReactDOM.findDOMNode(this).children){
        let resizeIframeFunc = resizeIframe(ReactDOM.findDOMNode(this).children);
        window.addEventListener('message', resizeIframeFunc);
      }
    }
  }

  componentWillReceiveProps (props){
    this.checkIframe(props);
  }
  componentWillMount() {
    this.checkIframe(this.props);
  }
  componentWillUnmount () {
    let resizeIframeFunc = resizeIframe(ReactDOM.findDOMNode(this).children);

    window.removeEventListener('message', resizeIframeFunc);
  }

  render () {
    let {step, path} = this.props;
    let {lang} = this.context;
    let iframe = oembedI18N(step, lang);
    let url = oembedUrlI18N(step, lang);

    const divClassNames = classNames({
      'learning-step': true,
      'no-defined-height-width': isNDLASource(url)
    });

    let editStepTarget = `/learningpaths/${path.id}/step/${step.id}/edit`;
    return (
      <div>
        <div className={divClassNames} dangerouslySetInnerHTML={{__html: iframe}}/>
        <Link to={editStepTarget}>Edit</Link>
      </div>
    );
  }
}

LearningPathStep.propTypes = {
  path: PropTypes.object.isRequired,
  step: PropTypes.object.isRequired
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  path: state.learningPath,
  step: state.learningPathStep
});

export default connect(mapStateToProps)(LearningPathStep);
