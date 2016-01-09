import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  render() {
    return (
      <div>
        <h1>Lær noe nytt!</h1>

        {this.state.loggedIn ? (
          <Link to="/logout">Logg ut</Link>
        ) : (
          <Link to="/login">Logg inn</Link>
        )}

        {this.props.children}
      </div>
    );
  }
}
