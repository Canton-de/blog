import api from '../../api/api';
import { LOGIN_FAILED, USER_LOGGINING } from '../types/loginTypes';
import { loadCurUserProfile } from './userActions';

type toggleUserIsLogginingActionType = {
  type: typeof USER_LOGGINING;
  isLoggining: boolean;
};

const toggleUserIsLoggining = (isLoggining: boolean): toggleUserIsLogginingActionType => ({
  type: USER_LOGGINING,
  isLoggining,
});

const loginFailed = () => ({ type: LOGIN_FAILED });

const logInAccount = (data: any) => async (dispatch: any) => {
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
export default logInAccount;
