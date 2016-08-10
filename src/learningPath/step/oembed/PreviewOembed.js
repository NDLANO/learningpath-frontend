/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import polyglot from '../../../i18n';
import Oembed from './Oembed';

export default class PreviewOembed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewOembed: false,
    };
    this.onPreviewClick = this.onPreviewClick.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ previewOembed: false });
  }

  onPreviewClick(evt) {
    this.setState({ previewOembed: true });
    evt.preventDefault();
  }

  render() {
    const { content } = this.props;
    if (!content) {
      return null;
    }

    let frameClasses = classNames({
      learningsource__frame: true,
      'learningsource__frame--hidden': !this.state.previewOembed,
    });

    let previewButton = !this.state.previewOembed
    ? (
      <a className="learningsource__expand" onClick={this.onPreviewClick}>
        <span className="button button--outline">{polyglot.t('editPathStep.previewOembed')}</span>
      </a>) : null;

    return (<div className="learningsource--wrapper">
      <div className={frameClasses}>
        <Oembed oembedContent={content} />
        {previewButton}
      </div>
    </div>);
  }
}

PreviewOembed.propTypes = {
  content: PropTypes.object,
};
