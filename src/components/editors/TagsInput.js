import React, { PropTypes, Component } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';

class TagsInput extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  render() {
    const { lang, value, onChange, ...props } = this.props;
    const { open } = this.state;
    const mappedValue = value.filter(element => element.language === lang)
                             .map(element => element.tag);

    const data = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et'];
    const handleAdd = (tagName) => {
      const tag = {tag: tagName, language: lang };
      value.push(tag);
      onChange(value);
    };

    const handleChange = (values) => {
      const mapped = values.map(tag => { return {tag, language: lang};});
      onChange(mapped);
    };

    const handleSearch = (searchTerm) => {
      this.setState({ open: searchTerm.length > 2 });
    };

    return <Multiselect {...props} open={open} onToggle={() => {}} onSearch={handleSearch} value={mappedValue} data={data} onChange={handleChange} onCreate={handleAdd}/>;
  }
}

TagsInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired
};

export default TagsInput;
