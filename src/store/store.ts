import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

const store = createStore(
  combineReducers({ userReducer, loginReducer }),
  applyMiddleware(thunk)
);

export default store;
