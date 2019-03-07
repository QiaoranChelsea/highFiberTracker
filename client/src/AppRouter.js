import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'

function AppRouter() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Route path="/" exact component={App} />
        <Route path="/signup/" component={SignUp} />
      </div>
    </Router>
  );
}

export default AppRouter;