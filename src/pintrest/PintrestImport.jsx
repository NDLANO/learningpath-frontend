/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PintrestBoardForm from './PintrestBoardForm';

class PintrestImport extends Component {
  render() {
    return (
      <PintrestBoardForm />
    );
  }
}

PintrestImport.propTypes = { };

const mapStateToProps = state => Object.assign({}, state, {
});

export default connect(mapStateToProps)(PintrestImport);
