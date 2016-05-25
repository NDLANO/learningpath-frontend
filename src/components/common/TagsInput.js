import React, { PropTypes, Component } from 'react';
import polyglot from '../../i18n';
import Multiselect from 'react-widgets/lib/Multiselect';

const messages = {
  createNew: polyglot.t('tagInput.createNew'),
  emptyFilter: polyglot.t('tagInput.emptyFilter'),
  emptyList: polyglot.t('tagInput.emptyList')
};

class TagsInput extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  render() {
    const { lang, value, onChange, onBlur, ...props } = this.props;

    if (typeof value === 'string') { // Handle redux form values witch are initialized as strings
      return null;
    }

    const { open } = this.state;
    const mappedValue = value.filter(element => element.language === lang)
                             .map(element => element.tag);

    const data = ['Andre verdenskrig', 'Første verdenskrig', 'Verdenskart', 'Verdens ende'];
    const handleAdd = (tagName) => {
      const tag = {tag: tagName, language: lang };
      value.push(tag);
      onChange(value);
    };

    const handleChange = (values) => {
      const otherLangValues = value.filter(element => element.language !== lang);
      const currentLangValues = values.map(tag => ({tag, language: lang}));
      onChange(currentLangValues.concat(otherLangValues));
    };

    const handleSearch = (searchTerm) => {
      this.setState({ open: searchTerm.length > 2 });
    };

    return (
      <Multiselect
        {...props}
        data={data}
        filter="contains"
        open={open}
        messages={messages}
        value={mappedValue}
        onBlur={() => onBlur(value)}
        onChange={handleChange}
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
  lang: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
};

export default TagsInput;
