import React from 'react';
import { Link } from 'react-router-dom';
import AuthHelper from './AuthHelper';
import sanitize from '../methods/sanitize';

class Login extends React.Component {
  Auth = new AuthHelper();
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }
  }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: sanitize(e.target.value)
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
                  required
                  onChange={this.handleChange}
                />
                <input
                  placeholder="password"
                  name="password"
                  type="password"
                  required
                  onChange={this.handleChange}
                />
                </form>
                <div id="buttons">
                  <button className="submit" onClick={this.handleFormSubmit}> log in </button>
                  <a href={`http://localhost:3001/auth/facebook?link=${window.location.origin}/socialauthredirect`}>
                    <button className="fb">
                      <span className="iconFB"></span> facebook
                    </button>
                   </a>
                </div>
              <Link className="link" to="/signup"> don't have an account? 
                <span className="signup-link"> sign up </span>
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    }
}
export default Login;