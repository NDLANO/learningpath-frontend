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
import { fetchPins } from './pintrestApi';

class PintrestImport extends Component {

  constructor(props) {
    super(props);
    this.state = { pins: [], fetchingPins: false };
    this.handleBoardNameSubmit = this.handleBoardNameSubmit.bind(this);
  }

  handleBoardNameSubmit(boardName) {
    this.setState({ fetchingPins: true });
    fetchPins(boardName)
      .then((pins) => {
        console.log(pins);
        this.setState({ pins });
        this.setState({ fetchingPins: false });
      }).catch(() => {
        this.setState({ fetchingPins: false });
      })
    ;
  }

  render() {
    return (
      <div>
        <PintrestBoardForm onBoardNameSubmit={this.handleBoardNameSubmit} />
      </div>
    );
  }
}

PintrestImport.propTypes = { };

const mapStateToProps = state => Object.assign({}, state, {
});

export default connect(mapStateToProps)(PintrestImport);
