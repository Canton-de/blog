import { ThunkAction } from 'redux-thunk';
import api from '../../api/api';
import { IUserForm } from '../../models/registrationPage';
import { stateType } from '../store';
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

export type serverErrorsType = {
  username?: string[];
  email?: string[];
  password?: string[];
};

type setServerErrorsActionType = {
  type: typeof SET_SERVER_ERRORS;
  errors: serverErrorsType;
};
const setServerErrors = (errors: serverErrorsType): setServerErrorsActionType => ({
  type: SET_SERVER_ERRORS,
  errors,
});

export type reginsterActionTypes = toggleUserIsRegistratingActionType | setServerErrorsActionType;

const registerAccount =
  (data: IUserForm): ThunkAction<void, stateType, unknown, reginsterActionTypes> =>
  async (dispatch) => {
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
