import React from 'react';

class Login extends React.Component {
  /* Login Component */

  constructor(props) {
    // Initialize mutable state
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = { password: '', session: lightdm.sessions[0].key, user: lightdm.users[0].name};
  }

  componentDidMount() {
    //I know this is insane but it works!!!
    let self = this;
    // Watch user and session for changes and update settings if changed
    window.authentication_complete = function () {
      if (lightdm.is_authenticated) {
        lightdm.login(lightdm.authentication_user, self.state.session);
      } else {
        if (lightdm._username)
          lightdm.cancel_authentication();
        lightdm.start_authentication(self.state.user);
        // $scope.loginForm.password.$setValidity("correct", false);
        // $('#pass').select();
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.user);
    lightdm.start_authentication(this.state.user);
    this.signIn();
  }

  signIn() {
    lightdm.cancel_timed_login();
    lightdm.provide_secret(this.state.password);
  }

  handleUsernameChange(event) {
    this.setState({ user: event.target.value });
    if (lightdm._username)
      lightdm.cancel_authentication();
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    if (lightdm._username)
      lightdm.cancel_authentication();
  }

  render() {
    // Render number of likes
    return (

      <div>
        <form id="comment-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.user} onChange={this.handleUsernameChange} />
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
          <input type="submit" />
        </form>
      </div>

    );
  }
}

export default Login;
