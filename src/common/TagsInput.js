import React, { PropTypes, Component } from 'react';
import polyglot from '../i18n';
import Multiselect from 'react-widgets/lib/Multiselect';


class TagsInput extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  render() {
    const { value, tagOptions, onChange, onBlur, ...props } = this.props;

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
      if (value.includes(tag)) {
        return;
      }
      value.push(tag);
      onChange(value);
    };


    const handleSearch = (searchTerm) => {
      this.setState({ open: searchTerm.length > 2 });
    };

    return (
      <Multiselect
        {...props}
        data={tagOptions}
        filter="contains"
        open={open}
        messages={messages}
        value={value}
        onBlur={() => onBlur(value)}
        onChange={onChange}
        onCreate={handleAdd}
        onToggle={() => {}}
        onSearch={handleSearch}
      />
    );
  }
}

TagsInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  tagOptions: PropTypes.array.isRequired,
};

export default TagsInput;
