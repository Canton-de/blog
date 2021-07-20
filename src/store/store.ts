import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';
import historyReducer from './reducers/historyReducer';

const store = createStore(combineReducers({ userReducer, loginReducer, historyReducer }), applyMiddleware(thunk));

export default store;
