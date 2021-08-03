import api from '../../api/api';
import { SET_SERVER_ERRORS, USER_REGISTRATING } from '../types/registerTypes';
import { loadCurUserProfile } from './userActions';

type toggleUserIsRegistratingActionType = {
  type: typeof USER_REGISTRATING;
  isRegistrating: boolean;
};

const toggleUserIsRegistrating = (isRegistrating: boolean): toggleUserIsRegistratingActionType => ({
  type: USER_REGISTRATING,
  isRegistrating,
});

type setServerErrorsActionType = {
  type: typeof SET_SERVER_ERRORS;
  errors: string;
};

const setServerErrors = (errors: string): setServerErrorsActionType => ({
  type: SET_SERVER_ERRORS,
  errors,
});

const registerAccount = (data: any) => async (dispatch: any) => {
  dispatch(toggleUserIsRegistrating(true));
  try {
    const regData = await api.register(data);
    const { token } = regData.data.user;
    localStorage.setItem('token', token);
    dispatch(toggleUserIsRegistrating(false));
    dispatch(loadCurUserProfile());
  } catch (e) {
    dispatch(setServerErrors(e.response?.data?.errors));
    dispatch(toggleUserIsRegistrating(false));
  }
};

export default registerAccount;
