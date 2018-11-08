/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import polyglot from '../i18n';
import { parseHash } from './sessionActions';
import { LocationShape } from '../shapes';

export class SessionInitializer extends React.Component {
  componentWillMount() {
    const {
      localParseHash,
      location: { hash },
    } = this.props;
    localParseHash(hash);
  }

  render() {
    return (
      <div>
        <Helmet title={polyglot.t('htmlTitles.sessionInitializer')} />
      </div>
    );
  }
}

SessionInitializer.propTypes = {
  localParseHash: PropTypes.func.isRequired,
  location: LocationShape,
};

const mapDispatchToProps = {
  localParseHash: parseHash,
};
export default connect(
  state => state,
  mapDispatchToProps,
)(SessionInitializer);
