import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SlidingDialog extends React.Component {
  /* Login Component */

  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="background"
        transitionEnterTimeout={100}
        transitionLeaveTimeout={0}
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={true}>
        <div className="mc-card">
          <div className="mc-header" onClick={this.toggleSettings}>
            <h1 className="mc-title"> Settings </h1>
          </div>
          <div className="mc-content" mc-layout="2">
            <div className="mc-layout" mc-layout-size="normal">
              <form className="selections">
                <label> User </label>
                <select name="user" onChange={this.props.userHandle} >
                  {lightdm.users.map(user => (

                    <option key={user.name}>
                      {user.name}
                    </option>))
                  }
                </select>

                <label> Session </label>
                <select name="user" onChange={this.props.sessionHandle} >
                  {lightdm.sessions.map(session => (
                    <option key={session.key}>
                      {session.key}
                    </option>))
                  }
                </select>
              </form>
              <a className="mc-button mc-button-text" onClick={lightdm.restart}> Restart </a>
              <a className="mc-button mc-button-text" onClick={lightdm.shutdown}> Shutdown </a>
            </div>
          </div>
        </div>


      </ReactCSSTransitionGroup>
    );
  }
}

export default SlidingDialog;
