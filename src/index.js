import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App/Injectable";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { store } from "configureStore";
import history from "utils/history.js";
// import "./GlobalStyle.scss";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root")
);

// ! note ConnectedRouter only work when history props isAvail

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//! https://openbase.io/js/connected-react-router
