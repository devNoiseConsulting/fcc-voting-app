import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleClick(event) {
    console.log(this.state);

    let url = '/api/login';
    let myHeaders = new Headers();

    myHeaders.append('Accept', 'application/json, text/plain, */*');
    myHeaders.append('Content-Type', 'application/json');

    let data = {
      email: this.state.username,
      password: this.state.password
    };

    let form = new FormData();
    form.append('json', JSON.stringify(data));

    let myInit = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify(data)
    };

    let loginRequest = new Request(url, myInit);

    fetch(loginRequest)
      .then(function(response) {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data) {
        // DO WORK HERE!!!
        console.log(data);
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
      });
  }

  render() {
    return (
      <form>
        <input
          name="username"
          defaultValue={this.state.username}
          type="text"
          onChange={event => this.setState({ username: event.target.value })}
        />
        <br />
        <input
          name="password"
          defaultValue={this.state.password}
          type="password"
          onChange={event => this.setState({ password: event.target.value })}
        />
        <br />
        <input
          label="Submit"
          type="button"
          value="Submit"
          onClick={event => this.handleClick(event)}
        />
        <br />
      </form>
    );
  }
}

export default Login;
