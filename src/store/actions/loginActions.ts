import { ThunkAction } from 'redux-thunk';
import api from '../../api/api';
import { ILoginForm } from '../../models/loginPageModel';
import { stateType } from '../store';
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

type loginFailedActionType = {
  type: typeof LOGIN_FAILED;
};

const loginFailed = (): loginFailedActionType => ({ type: LOGIN_FAILED });

export type loginActionsTypes = toggleUserIsLogginingActionType | loginFailedActionType;

const logInAccount =
  (data: ILoginForm): ThunkAction<void, stateType, unknown, loginActionsTypes> =>
  async (dispatch) => {
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
