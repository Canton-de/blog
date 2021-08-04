/* eslint-disable no-unused-vars */
import { ThunkAction } from 'redux-thunk';
import api from '../../api/api';
import { stateType } from '../store';
import { SET_USER, UNLOG_USER, USER_AUTH_FAILED, USER_PROFILE_LOADING } from '../types/userTypes';

type userProfileLoadingActionType = {
  type: typeof USER_PROFILE_LOADING;
};

const userProfileLoading = (): userProfileLoadingActionType => ({ type: USER_PROFILE_LOADING });

type userDataType = {
  username: string;
  image: string | null;
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

type ungogginUserActionType = {
  type: typeof UNLOG_USER;
};

export const unlogginUser = (): ungogginUserActionType => ({ type: UNLOG_USER });

type userAuthFailedActionType = {
  type: typeof USER_AUTH_FAILED;
  error: string;
};

export const userAuthFailed = (): userAuthFailedActionType => ({
  type: USER_AUTH_FAILED,
  error: 'Ошибка загрузки ',
});

export type userActionsTypes =
  | userProfileLoadingActionType
  | setUserProfileActionType
  | ungogginUserActionType
  | userAuthFailedActionType;

export const loadCurUserProfile =
  (): ThunkAction<void, stateType, unknown, userActionsTypes> => async (dispatch) => {
    try {
      dispatch(userProfileLoading());
      const userData = await api.getUserData();
      dispatch(setUserProfile(userData));
    } catch (e) {
      localStorage.removeItem('token');
      dispatch(userAuthFailed());
    }
  };
