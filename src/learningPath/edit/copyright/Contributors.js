import React, { PropTypes, Component } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import polyglot from '../../../i18n';


class Contributors extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  render() {
    const { value, onChange, onBlur, ...props } = this.props;

    if (typeof value === 'string') { // Handle redux form values witch are initialized as strings
      return null;
    }

    const messages = {
      createNew: polyglot.t('copyrightInput.createNew'),
      emptyFilter: polyglot.t('copyrightInput.emptyFilter'),
      emptyList: polyglot.t('copyrightInput.emptyList'),
    };

    const { open } = this.state;

    const handleAdd = (contributor) => {
      if (value.includes(contributor)) {
        return;
      }
      value.push(Object.assign({ name: contributor, type: 'Forfatter' }));
      onChange(value);
    };


    const handleSearch = (searchTerm) => {
      this.setState({ open: searchTerm.length > 2 });
    };

    return (
      <Multiselect
        {...props}
        data={[]}
        filter="contains"
        open={open}
        messages={messages}
        value={value}
        textField="name"
        onBlur={() => onBlur(value)}
        onChange={onChange}
        onCreate={handleAdd}
        onToggle={() => {}}
        onSearch={handleSearch}
      />
    );
  }
}

Contributors.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};

export default Contributors;
