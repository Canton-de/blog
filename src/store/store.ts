import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';
import historyReducer from './reducers/historyReducer';
import registerReducer from './reducers/registerReducer';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  history: historyReducer,
  register: registerReducer,
});

type rootReducerType = typeof rootReducer;

export type stateType = ReturnType<rootReducerType>;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
