import { LOGIN_FAILED, USER_LOGGINING } from '../types/loginTypes';

const initialState = {
  isLoggining: false,
  loginFailed: false,
};

export type loginStateType = typeof initialState;

const loginReducer = (state = initialState, action: any): loginStateType => {
  switch (action.type) {
    case LOGIN_FAILED:
      return { ...state, loginFailed: true, isLoggining: false };
    case USER_LOGGINING:
      return { ...state, isLoggining: action.isLoggining };
    default:
      return state;
  }
};

export default loginReducer;
