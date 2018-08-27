import Home from "./Home";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Creating a route to our home page 
const Routes = () => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        component={Home}
      />
       </div>
  </Router>
);
export default Routes;
