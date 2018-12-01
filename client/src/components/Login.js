import React from 'react';
import { Link } from 'react-router-dom';
import AuthHelper from './AuthHelper';

class Login extends React.Component {
  Auth = new AuthHelper();

    state = {
      username: "",
      password: ""
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleFormSubmit = (e) => {
      e.preventDefault();

      this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        if (res === false) {
          return alert("Sorry, credentials don't exist!");
        }
        this.props.history.replace("/");
      })
      .catch(err => {
        console.log(err);
      });
    }

    componentWillMount() {
      if (this.Auth.loggedIn()){
        this.props.history.replace('/');
      }
    }

    render() {
      return (
        <React.Fragment>
          <div className="wrapper">
            <div className="box">
              <div className="header">
                <h1>Login</h1>
              </div>
              <form>
                <input
                  placeholder="username"
                  name="username"
                  type="text"
                  onChange={this.handleChange}
                />
                <input
                  placeholder="password"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
                <button className="submit" onClick={this.handleFormSubmit}> log in </button>
              </form>
              <Link className="link" to="/signup">Don't have an account? <span className="link-signup">Sign up</span></Link>
            </div>
          </div>
        </React.Fragment>
      );
    }
}
export default Login;