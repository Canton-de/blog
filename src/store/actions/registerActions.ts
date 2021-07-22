import Api from '../../api/api';
import { SET_SERVER_ERRORS, USER_REGISTRATING } from '../types/registerTypes';
import { loadCurUserProfile } from './userActions';

const api = new Api();

const toggleUserIsRegistrating = (isRegistating: boolean) => ({
  type: USER_REGISTRATING,
  isRegistating,
});

const setServerErrors = (errors: string) => ({ type: SET_SERVER_ERRORS, errors });

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
