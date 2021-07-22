import { LOGIN_FAILED, USER_LOGGINING } from '../types/loginTypes';

interface ILoginState {
  isLoggining: boolean;
  loginFailed: boolean;
}

const initialState: ILoginState = {
  isLoggining: false,
  loginFailed: false,
};

const loginReducer = (state = initialState, action: any): ILoginState => {
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
