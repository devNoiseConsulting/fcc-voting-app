import React, {Component} from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleClick(event){
    console.log(this.state);
  }

  render() {
    return (
      <form>
        <input name="username" defaultValue={this.state.username} type="text" onChange={(event) => this.setState({username:event.target.value})} />
        <br />
        <input name="password" defaultValue={this.state.password} type="password" onChange={(event) => this.setState({password:event.target.value})} />
        <br />
        <input label="Submit" type="button" value="Submit" onClick={(event) => this.handleClick(event)}/>
        <br />
      </form>
    );
  }
}

export default Login;
