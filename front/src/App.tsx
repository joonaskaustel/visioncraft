import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Home from "./views/home/Home";

export default function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}
