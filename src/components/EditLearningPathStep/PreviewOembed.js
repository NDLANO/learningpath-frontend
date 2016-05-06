import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import Oembed from '../Oembed';

export class PreviewOembed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewOembed: false
    };
  }

  onPreviewClick(evt) {
    this.setState({previewOembed: true});
    evt.preventDefault();
  }

  componentWillReceiveProps() {
    this.setState({previewOembed: false});
  }

  render() {
    const onPreviewClick = this.onPreviewClick.bind(this);
    const {content} = this.props;
    if (!content) {
      return null;
    }

    let frameClasses = classNames({
      'learningsource__frame': true,
      'learningsource__frame-hide': !this.state.previewOembed
    });

    let previewButton = !this.state.previewOembed
    ? (<a className='learningsource__expand' onClick={onPreviewClick}>
      <span className='button button--outline'>Forhåndsvis hele artikkelen</span>
      </a>)
    : null;

    return (<div className='learningsource--wrapper'>
      <div className={frameClasses}>
        <Oembed oembedContent={content}/>
        {previewButton}
      </div>
    </div>);
  }
}

PreviewOembed.propTypes = {
  content: PropTypes.object.isRequired
};

export default connect(state => state)(PreviewOembed);
