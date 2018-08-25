import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./redux/configure-store";

import Routes from "./routes";

import App from "./components/App";

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes />
          <App />
        </div>
      </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
