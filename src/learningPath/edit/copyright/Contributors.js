/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Multiselect from 'react-widgets/lib/Multiselect';
import polyglot from '../../../i18n';


class Contributors extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  render() {
    const { input, onUnsavedChanges, contributorOptions } = this.props;

    if (typeof value === 'string') { // Handle redux form values witch are initialized as strings
      return null;
    }

    const messages = {
      createOption: polyglot.t('copyrightInput.createNew'),
      emptyFilter: polyglot.t('copyrightInput.emptyFilter'),
      emptyList: '',
    };

    const { open } = this.state;

    const handleAdd = (contributor) => {
      if (input.value.includes(contributor)) {
        return;
      }
      input.value.push(Object.assign({ name: contributor, type: 'Forfatter' }));
      input.onChange(input.value);
    };

    const handleSearch = (searchTerm) => {
      onUnsavedChanges(searchTerm);
      this.setState({ open: searchTerm.length > 2 });
    };

    return (
      <Multiselect
        data={contributorOptions}
        filter="contains"
        open={open}
        messages={messages}
        value={input.value}
        textField="name"
        onBlur={() => input.onBlur(input.value)}
        onChange={input.onChange}
        onCreate={handleAdd}
        onToggle={() => { }}
        onSearch={handleSearch}
      />
    );
  }
}

Contributors.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }).isRequired,
  contributorOptions: PropTypes.array.isRequired,
  onUnsavedChanges: PropTypes.func.isRequired,
};

export default Contributors;
