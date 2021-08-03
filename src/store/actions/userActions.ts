/* eslint-disable no-unused-vars */
import api from '../../api/api';
import { SET_USER, UNLOG_USER, USER_AUTH_FAILED, USER_PROFILE_LOADING } from '../types/userTypes';

type userProfileLoadingActionType = {
  type: typeof USER_PROFILE_LOADING;
};

const userProfileLoading = (): userProfileLoadingActionType => ({ type: USER_PROFILE_LOADING });

type userDataType = {
  username: string;
  image: string;
  email: string;
};

type setUserProfileActionType = {
  type: typeof SET_USER;
  userData: userDataType;
};

const setUserProfile = (userData: userDataType): setUserProfileActionType => ({
  type: SET_USER,
  userData,
});

export const unlogginUser = () => ({ type: UNLOG_USER });

export const userAuthFailed = () => ({
  type: USER_AUTH_FAILED,
  error: 'Ошибка загрузки ',
});

export const loadCurUserProfile = () => async (dispatch: any) => {
  try {
    dispatch(userProfileLoading());
    const userData = await api.getUserData();
    dispatch(setUserProfile(userData));
  } catch (e) {
    localStorage.removeItem('token');
    dispatch(userAuthFailed());
  }
};
