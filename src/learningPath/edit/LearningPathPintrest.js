/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import PintrestImport from '../../pintrest/PintrestImport';
import Lightbox from '../../common/Lightbox';
import polyglot from '../../i18n';
import Button from '../../common/buttons/Button';

class LearningPathPintrest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayLightbox: false,
    };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }

  openLightbox() {
    this.setState({ displayLightbox: true });
  }

  closeLightbox() {
    this.setState({ displayLightbox: false });
  }

  render() {
    return (
      <div>
        <Button className="button button--primary" onClick={this.openLightbox}>
          {polyglot.t('pintrest.importFrom')}
        </Button>
        <Lightbox display={this.state.displayLightbox} width="800px" onClose={this.closeLightbox}>
          <PintrestImport />
        </Lightbox>
      </div>
    );
  }
}

LearningPathPintrest.propTypes = { };

const mapStateToProps = state => Object.assign({}, state, {
});

export default connect(mapStateToProps)(LearningPathPintrest);
