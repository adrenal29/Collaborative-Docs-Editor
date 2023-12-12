import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import allReducers from "./reducers";

const middlewares = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const allEnhancers = composeWithDevTools(...enhancers);

const store = createStore(allReducers, allEnhancers);

export type RootState = ReturnType<typeof store.getState>;

export default store;
