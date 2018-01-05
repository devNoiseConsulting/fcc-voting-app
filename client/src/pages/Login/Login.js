import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      displayError: false
    };
  }

  handleClick(event) {
    console.log(this.state);
    /*
    let getCookie = function(cookie) {
      return document.cookie.split(';').reduce(function(prev, c) {
        var arr = c.split('=');
        return arr[0].trim() === cookie ? arr[1] : prev;
      }, undefined);
    };
    */

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


/*
"email": "voter05@teamspam.net",
"password": "BadPasword"
*/
    fetch(loginRequest)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // DO WORK HERE!!!
        // need to pass this information up and save it.
        // Need to redirect the front page.
        this.setState({ id: data.id, redirectToReferrer: true });
        console.log(data);
      })
      .catch(error => {
        this.setState({ displayError: true });
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
      });
  }

  render() {
    const { redirectToReferrer } = this.state;
    //console.log('Login render()', this.state);

    if (redirectToReferrer) {
      // The state in the redirect will be passed to the component via props.location.
      // Thus you access this.props.location.state
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { username: this.state.username, id: this.state.id }
          }}
        />
      );
    }

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
