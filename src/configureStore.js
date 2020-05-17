// import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
// ! router middleware is to interact with history
import { routerMiddleware } from "connected-react-router";
// ! saga middleware to interact with saga
import createSagaMiddleware from "redux-saga";
import history from "utils/history.js";

import createReducer from "./reducers.js";

function configureStore(initialState = {}) {
  let enhancedCompose = compose;
  if (process.env.NODE_ENV !== "production" && typeof window === "object") {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const store = createStore(
    createReducer(),
    initialState,
    // enhancedCompose(...enhancers)
    enhancedCompose(
      ...[applyMiddleware(...[sagaMiddleware, routerMiddleware(history)])]
    )
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}

const store = configureStore({});

export { store };
