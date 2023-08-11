import { createStore, applyMiddleware, compose } from "redux";

import thunkMiddleWare from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

/**
 * Configure Dev tool
 */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = composeWithDevTools({
  name: "NPSS",
});
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;

export const Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleWare))
);

export const persistor = persistStore(Store);
Store.subscribe(() => {});
