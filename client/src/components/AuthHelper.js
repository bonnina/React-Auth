import decode from 'jwt-decode'

export default class AuthHelper {
 
  login = (username, password) => {
    return this.fetch(`/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      this.setToken(res.token); 
      return Promise.resolve(res);
    });
  };

  loggedIn = () => {
    const token = this.getToken(); 
    return !!token && !this.isTokenExpired(token); 
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      console.log("token invalid or expired");
      return false;
    }
  };

  setToken = tkn => {
    localStorage.setItem("token", tkn);
  };

  getToken = () => {
    return localStorage.getItem("token");
  };

  logout = () => {
    localStorage.removeItem("token");
  };

  decodeTkn = () => {
    let answer = decode(this.getToken());
    console.log("Received answer!");
    return answer;
  };

  fetch = (url, options) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this.checkStatus)
      .then(response => response.json())
      .catch(err =>  alert("Sorry, credentials don't exist!"));
  };

  checkStatus = res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    } else {
      let error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
  };
}
