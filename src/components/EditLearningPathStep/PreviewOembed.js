import React, {PropTypes} from 'react';
import classNames from 'classnames';
import polyglot from '../../i18n';
import Oembed from '../Oembed';

export default class PreviewOembed extends React.Component {
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
      'learningsource__frame--hidden': !this.state.previewOembed
    });

    let previewButton = !this.state.previewOembed
    ? (<a className='learningsource__expand' onClick={onPreviewClick}>
      <span className='button button--outline'>{polyglot.t('editPathStep.previewOembed')}</span>
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
