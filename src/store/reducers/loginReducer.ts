import Api from '../../api/api';
import { loadCurUserProfile } from './userReducer';

interface ILoginState {
  isLoggining: boolean;
  loginFailed: boolean;
}

const api = new Api();

const initialState: ILoginState = {
  isLoggining: false,
  loginFailed: false,
};

const USER_LOGGINING = 'USER_LOGGINING';
const LOGIN_FAILED = 'LOGIN_FAILED';

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

export const toggleUserIsLoggining = (isLoggining: boolean) => ({
  type: USER_LOGGINING,
  isLoggining,
});

const loginFailed = () => ({ type: LOGIN_FAILED });

export const logInAccount = (data: any) => async (dispatch: any) => {
  dispatch(toggleUserIsLoggining(true));
  try {
    const response = await api.login(data);
    const { token } = response.data.user;
    localStorage.setItem('token', token);
    dispatch(toggleUserIsLoggining(false));
    dispatch(loadCurUserProfile());
  } catch (e) {
    dispatch(loginFailed());
  }
};
export default loginReducer;
