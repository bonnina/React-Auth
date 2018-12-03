import React from "react";
import AuthHelper from './AuthHelper';

class FacebookAuthRedirect extends React.Component {
  Auth = new AuthHelper();

  componentWillMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    if(!token) {
      this.props.history.replace("/login");
    }
    this.Auth.setToken(token); 
    this.props.history.replace("/");
  }

  render() {
    return <div />
  }
}


export default FacebookAuthRedirect;