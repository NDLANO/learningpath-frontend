import React, { PropTypes } from 'react';
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


export default class Oembed extends React.Component {

  checkIframe ({oembedContent}) {
    const ndlaIsSource = oembedContent.url != undefined ? ((/http:\/\/ndla.no/).test(oembedContent.url)) : false;
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
    let {oembedContent} = this.props;
    const ndlaIsSource = oembedContent.url != undefined ? ((/http:\/\/ndla.no/).test(oembedContent.url)) : false;

    const divClassname = (ndlaIsSource) => classNames({
      'learning-step': true,
      'learning-step--without-dimensions': ndlaIsSource === true
    });
    return (
      <div className={divClassname(ndlaIsSource)} dangerouslySetInnerHTML={{__html: oembedContent.html}}/>
    );
  }
}

Oembed.propTypes = {
  oembedContent: PropTypes.object.isRequired
};

Oembed.defaultProps = {
  oembedContent: {}
};