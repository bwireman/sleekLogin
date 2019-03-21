import React from 'react';
import Time from 'react-time';
import moment from 'moment';
import SlidingDialog from './slidingDialog';

class Login extends React.Component {
  /* Login Component */

  constructor(props) {
    // Initialize mutable state
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSessionChagne = this.handleSessionChagne.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);

    this.state = { password: '', session: lightdm.sessions[0].key, user: lightdm.users[0].name, now: moment.now(), showSettings: false };
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

    self.interval = setInterval(() => {
      self.setState({
        now: moment.now(),
      });
    }, 1000);
  }

  handleSubmit(event) {
    event.preventDefault();

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

  handleSessionChagne(event) {
    this.setState({ session: event.target.value });
    if (lightdm._username)
      lightdm.cancel_authentication();
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    if (lightdm._username)
      lightdm.cancel_authentication();
  }

  toggleSettings(event) {
    this.setState({ showSettings: !this.state.showSettings });
  }

  render() {
    return (

      <div>
        <div className="mc-card">
          <div className="mc-header click-hover" onClick={this.toggleSettings}>
            <img src="./assets/avatar.png" alt="./assets/avatar.png" />
            <h1 className="mc-title">{this.state.user}</h1>
            <h1 className="mc-subtitle"><Time value={this.state.now} format="HH:mm:ss" /> </h1>
          </div>
          <div className="mc-content" mc-layout="1">
            <div className="mc-layout" mc-layout-size="normal">
              <form onSubmit={this.handleSubmit}>

                <div className="mc-input">
                  <input type="password" value={this.state.password} onChange={this.handlePasswordChange} autoFocus />
                  <span>password</span>
                </div>
                <input type="submit" className="hidden" />
              </form>
            </div>
          </div>
        </div>
        {this.state.showSettings ? <SlidingDialog sessionHandle={this.handleSessionChagne} userHandle={this.handleUsernameChange}/> : null}

      </div >

    );
  }
}

export default Login;
