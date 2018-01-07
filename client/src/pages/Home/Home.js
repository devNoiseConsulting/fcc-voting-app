import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    console.log('App render()', this.state, this.props.location.state);

    return (
      <div className="App">
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/contact">Contact</Link>
        </p>
        <p>
          <Link to="/notexist">Not Exist</Link>
        </p>
        <p>{this.props.children}</p>
      </div>
    );
  }
}

export default App;
