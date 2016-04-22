import React, {PropTypes} from 'react';
import Icon from './Icon';

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    const { display } = props;
    this.state = {
      display: display
    };

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
  }

  _onCloseButtonClick() {
    const {onClose} = this.props;
    this.setState({display: false});
    onClose();
  }

  componentWillReceiveProps (props) {
    const { display } = props;
    this.setState({display});
  }

  render() {
    const {children} = this.props;

    return this.state.display ? <div className='lightbox'>
      <div className='lightbox_content'>
        <a href="#" className='close-dialog' onClick={this._onCloseButtonClick}>
          <Icon.Clear />
        </a>
        {children}
      </div>
    </div> : <div></div>;
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func.isRequired
};
