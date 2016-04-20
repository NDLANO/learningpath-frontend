import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { oembedI18N, oembedUrlI18N } from '../util/i18nFieldFinder';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

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


export class LearningPathStep extends React.Component {

  checkIframe (props) {
    let {step} = props;
    let {lang} = this.context;
    let url = oembedUrlI18N(step, lang);

    const ndlaIsSource = url != undefined ? ((/http:\/\/ndla.no/).test(url)) : false;
    if (ndlaIsSource && ReactDOM.findDOMNode(this) != null){
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

  render (){
    let {step} = this.props;
    let {lang} = this.context;
    let iframe = oembedI18N(step, lang);
    let url = oembedUrlI18N(step, lang);
    const ndlaIsSource = url != undefined ? ((/http:\/\/ndla.no/).test(url)) : false;

    const divClassname = (ndlaIsSource) => classNames({
      'learning-step': true,
      'no-defined-height-width': ndlaIsSource === true
    });
    return (
      <div className={divClassname(ndlaIsSource)} dangerouslySetInnerHTML={{__html: iframe}}/>
    );
  }
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
