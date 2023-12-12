import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pathReducer from "./pathReducer";

const allReducers = combineReducers({ auth: authReducer, path: pathReducer });

export default allReducers;
