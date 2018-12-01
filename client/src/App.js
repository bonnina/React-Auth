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
      <div className="App">
        <div className="main-page">
          <div className="top-section">
            <h1>Welcome, {name}</h1>
          </div>
          <div className="bottom-section">
            <button onClick={this.handleLogout}> LOG OUT </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(App);
