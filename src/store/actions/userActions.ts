import Api from '../../api/api';
import { SET_USER, UNLOG_USER, USER_PROFILE_LOADING } from '../types/userTypes';

const api = new Api();

const userProfileLoading = () => ({ type: USER_PROFILE_LOADING });

const setUserProfile = (data: any) => ({
  type: SET_USER,
  data,
});

export const unlogginUser = () => ({ type: UNLOG_USER });

export const loadCurUserProfile = () => async (dispatch: any) => {
  dispatch(userProfileLoading());
  const userData = await api.getUserData();
  dispatch(setUserProfile(userData));
};
