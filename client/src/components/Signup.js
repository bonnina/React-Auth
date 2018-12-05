import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import AuthHelper from './AuthHelper';
import sanitize from '../methods/sanitize';

export default class Signup extends React.Component {
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
      [e.target.name]:  sanitize(e.target.value)
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
      
    axios.post("/signup", {
      username: this.state.username,
      password: this.state.password
    })
    .then(res =>  {
      this.Auth.setToken(res.data.token); 
      this.props.history.replace("/");
    })
    .catch(err => {
      console.log(err);
      alert('Sorry, this username alredy exists')
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="box">
            <div className="header">
              <h1>Signup</h1>
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
              <button className="submit" onClick={this.handleFormSubmit}> sign up </button>
              <a href={`http://localhost:3001/auth/facebook?link=${window.location.origin}/socialauthredirect`}>
                <button className="fb">
                  <span className="iconFB"></span> facebook
                </button>
              </a>
            </div>
            <Link className="link" to="/login"> have an account? 
              <span className="signup-link"> log in </span>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
