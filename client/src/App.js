import React from 'react';
import AuthHelper from './components/AuthHelper';
import withAuth from './components/withAuth';

class App extends React.Component {
  Auth = new AuthHelper();
  state = {
    username: "",
    password: ""
  }

  handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    let name = this.props.confirm.username;

    return (
      <div className="wrapper">
        <div className="box">
          <div className="header">
            <h1>Welcome, {name}</h1>
          </div>
          <div>
            <button className="submit" onClick={this.handleLogout}> log out </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(App);
