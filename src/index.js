import React from 'react';
import { render } from 'react-dom';

class TheApp extends React.Component {
  render() {
    return (
      <div>
        <h1>Lær noe nytt!</h1>

        <div>
          <a href="/login">Logg inn</a>
        </div>

        <div>
          <h2>Hei Kristofer!</h2>
          <div>
            <a href="/logout">Logg ut</a>
          </div>
        </div>
      </div>
    );
  }
}

render(<TheApp />, document.getElementById('appContainer'));
