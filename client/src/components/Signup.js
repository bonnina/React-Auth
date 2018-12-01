import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import AuthHelper from './AuthHelper';

export default class Signup extends React.Component {
  Auth = new AuthHelper();

  state = {
      username: "",
      password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
      
    axios.post("/signup", {
      username: this.state.username,
      password: this.state.password
    })
    .then(data => {
      console.log(data);
      this.props.history.replace("/login");
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
                onChange={this.handleChange}
              />
              <input
                placeholder="password"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
              <button className="submit" onClick={this.handleFormSubmit}> sign up </button>
            </form>
            <Link className="link" to="/login"> Already have an account? <span className="link-signup">Log in</span></Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
