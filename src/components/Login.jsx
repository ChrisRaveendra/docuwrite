import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import axios from 'axios';
// axios.defaults.baseURL = 'https://localhost:3000';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: true,
      isLogin: true,
      password: '',
      username: '',
      pwdMatch: false,
      email: '',
    };
  }

  handleChange() {
    if (this.state.email && this.state.password) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  handleSubmit() {
    const url = `http://localhost:3000/${this.state.isLogin ? 'login' : 'signup'}`;
    // console.log(url);
    axios.post(url, {
      email: this.state.email,
      password: this.state.password,
    })
    .then(({ data }) => console.log(data))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Paper >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px' }}>
            <TextField
              floatingLabelText="email"
              onChange={(e) => { this.setState({ email: e.target.value }); this.handleChange(); }}
            />
            <br />
            {this.state.isLogin ?
        (<TextField
          floatingLabelText="password"
          type="password"
          onChange={(e) => { this.setState({ password: e.target.value }); this.handleChange(); }}
        />) :
        (<div>
          <TextField
            floatingLabelText="username"
            onChange={(e) => { this.setState({ username: e.target.value }); }}
          />
          <br />
          <TextField
            floatingLabelText="password"
            type="password"
            onChange={(e) => { this.setState({ password: e.target.value }); this.handleChange(); }}
          />
          <br />
          <TextField
            floatingLabelText="retype password"
            type="password"
            errorText={this.state.pwdMatch ? '' : 'Passwords must match'}
            onChange={(e) => { this.setState({ pwdMatch: this.state.password === e.target.value }); }}
          />
        </div>
      )}
            <br />
            <RaisedButton
              label={this.state.isLogin ? 'login' : 'register'}
              primary
              disabled={this.state.disable}
              onClick={() => this.handleSubmit()}
            />
            <br />
            <RaisedButton
              label={this.state.isLogin ? 'register' : 'login'}
              onClick={() => this.setState({ isLogin: !this.state.isLogin })}
            />
          </div>
        </Paper>
      </div>
    );
  }
}
