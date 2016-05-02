import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import get from 'lodash/get';

export const urlIsNDLA = url => (/http:\/\/ndla.no/).test(url);


export default class Oembed extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isNDLAResource: false,
      listeningToResize: false
    };

    this.handleResizeMessage = this.handleResizeMessage.bind(this);
  }

  componentWillReceiveProps (props){
    this.handleIframeResizing(props);
  }

  componentDidMount() {
    this.handleIframeResizing(this.props);
  }

  componentWillUnmount() {
    this.disableIframeResizing();
  }

  handleIframeResizing ({oembedContent: {url}}) {
    if ( urlIsNDLA(url) ) {
      this.setState({isNDLAResource: true}, this.enableIframeResizing);
    } else {
      this.setState({isNDLAResource: false}, this.disableIframeResizing);
    }
  }

  enableIframeResizing() {
    if (!this.state.listeningToResize) {
      this.setState({ listeningToResize: true }, () => {
        window.addEventListener('message', this.handleResizeMessage);
      });
    }
  }

  disableIframeResizing() {
    if (this.state.listeningToResize) {
      this.setState({ listeningToResize: false }, () => {
        window.removeEventListener('message', this.handleResizeMessage);
      });
    }
  }

  handleResizeMessage (evt) {
    if (!this.state.listeningToResize) {
      return;
    }

    const iframe = this.getIframeDOM();

    if (iframe.contentWindow !== get(evt, 'source')) {
      return;
    }

    let newHeight = parseInt(get(evt, 'data.height', 0)) + 35;
    let currentHeight = parseInt(get(iframe, 'style.height')||0);

    if (newHeight > currentHeight) {
      iframe.style.height = newHeight + 'px';
    }
  }

  getIframeDOM () {
    return ReactDOM.findDOMNode(this).children[0];
  }


  render() {
    const {oembedContent: {html}} = this.props;

    return <div className={classNames({
      'learning-step': true,
      'learning-step--without-dimensions': this.state.isNDLAResource
    })}
    dangerouslySetInnerHTML={{__html: html}}
    />;
  }
}

Oembed.propTypes = {
  oembedContent: PropTypes.object.isRequired
};
