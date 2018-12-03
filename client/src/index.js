import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import FacebookAuthRedirect from './components/FacebookAuthRedirect';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<BrowserRouter>
  <div>
    <Route exact path="/" component={App} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/socialauthredirect/" component={FacebookAuthRedirect} />
  </div>
</BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();