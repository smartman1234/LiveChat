import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      field_user: "",
      field_pass: "",
      error: 0
    };
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: 0
    });
  };
  toggleLogin = e => {

    const _self = this;
    // Math.random().toString(36).substr(2, 5);
    axios.post('/user/login', {
      username: this.state.field_user,
      password: this.state.field_pass,
      updateTime: Date.now()
    })
    .then(function (res) {
      if(res.data != 'not found') { // no error
        console.log(res.data);
        window.location = '/chatroom';
      } else { // _message is ERROR message, error occurs!
        console.log(res.data);
        _self.setState({
          error: 1,
          field_user: "",
          field_pass: ""
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });  

  };

  signUpPage = e => {
    axios.get('/redirect?page=signup')
    .then(function (res) {
      console.log(res);
      window.location = '/signup';
    })
    .catch(function (error) {
      console.log(error);
    });  
  }

  render() {
    return (
      <Dialog 
        open 
        onRequestClose={this.toggleLogin}
        fullScreen={this.props.fullScreen}>
        <DialogTitle>登入</DialogTitle>
        <DialogContent>
          <DialogContentText>
            請輸入您的暱稱與密碼。
          </DialogContentText>
          <TextField
            autoFocus
            error={this.state.error}
            margin="dense"
            id="username"
            label="暱稱"
            type="username"
            value={this.state.field_user}
            onChange={this.handleChange('field_user')}
            fullWidth
          />
          <TextField
            autoFocus
            error={this.state.error}
            margin="dense"
            id="password"
            label="密碼"
            type="password"
            value={this.state.field_pass}
            onChange={this.handleChange('field_pass')}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.signUpPage} color="secondary">
            註冊
          </Button>
          <Button onClick={this.toggleLogin} color="primary">
            確認
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Login;