import React, {PropTypes} from 'react';
import Icon from './Icon';

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: props.display };
  }

  _onCloseButtonClick() {
    this.setState({display: false}, () => this.props.onClose());
  }

  componentWillReceiveProps (props) {
    const { display } = props;
    this.setState({display});
  }

  render() {
    const {children} = this.props;
    const onClose  = this._onCloseButtonClick.bind(this);

    return this.state.display ? <div className='lightbox'>
      <div className='lightbox_content'>
        <a href="#" className='close-dialog' onClick={onClose}>
          <Icon.Clear />
        </a>
        {children}
      </div>
    </div> : null;
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func,
  display: PropTypes.bool
};

Lightbox.defaultProps = {
  display: true,
  onClose: () => {}
};
