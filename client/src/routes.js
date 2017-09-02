import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";

const Routes = props => (
  <div>
  <Router {...props}>
    <Route exact path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="*" component={NotFound} />
  </Router>
  </div>
);

export default Routes;
