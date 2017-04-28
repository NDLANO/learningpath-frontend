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

import polyglot from '../i18n';


class TagsInput extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  render() {
    const { tagOptions, input, onUnsavedChanges } = this.props;

    const messages = {
      createNew: polyglot.t('tagInput.createNew'),
      emptyFilter: polyglot.t('tagInput.emptyFilter'),
      emptyList: polyglot.t('tagInput.emptyList'),
    };

    if (typeof value === 'string') { // Handle redux form values witch are initialized as strings
      return null;
    }

    const { open } = this.state;

    const handleAdd = (tag) => {
      if (input.value.includes(tag)) {
        return;
      }
      input.value.push(tag);
      input.onChange(input.value);
    };

    const handleSearch = (searchTerm) => {
      onUnsavedChanges(searchTerm);
      this.setState({ open: searchTerm.length > 2 });
    };
    return (
      <Multiselect
        data={tagOptions}
        filter="contains"
        open={open}
        messages={messages}
        value={input.value}
        onBlur={() => input.onBlur(input.value)}
        onChange={input.onChange}
        onCreate={handleAdd}
        onToggle={() => { }}
        onSearch={handleSearch}
      />
    );
  }
}

TagsInput.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }).isRequired,
  tagOptions: PropTypes.array.isRequired,
  onUnsavedChanges: PropTypes.func.isRequired,
};

export default TagsInput;
