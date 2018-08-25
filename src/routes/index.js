import Home from "./Home";
import React from "react";
import _ from "lodash";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


const Routes = () => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        // component={
        //   !localStorage.getItem("id_token") ?

        //   Refresh
        //   :
        //   Authorization(['superAdmin','admin'])(Home)
        // }
        component={Home}
      />
       </div>
  </Router>
);
export default Routes;
