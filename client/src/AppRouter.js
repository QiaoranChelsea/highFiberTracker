import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App'
import AccountDefault from './components/account/AccountDefault'
import NavBar from './components/NavBar'

function AppRouter() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Route path="/" exact component={App} />
        <Route path="/signup/" component={AccountDefault} />
      </div>
    </Router>
  );
}

export default AppRouter;