import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

import './index.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
