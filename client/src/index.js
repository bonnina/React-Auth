import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<BrowserRouter>
  <div>
    <Route exact path="/" component={App} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
  </div>
</BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();