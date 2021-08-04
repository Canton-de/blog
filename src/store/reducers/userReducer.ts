import { userActionsTypes } from '../actions/userActions';
import { SET_USER, UNLOG_USER, USER_AUTH_FAILED, USER_PROFILE_LOADING } from '../types/userTypes';

const initialState = {
  username: null as null | string,
  image: null as null | string,
  isLoggedIn: false,
  isUserProfileLoading: false,
  isRegistrationLoading: false,
  email: null as null | string,
  error: null as null | string,
};

export type userStateType = typeof initialState;

const userReducer = (state = initialState, action: userActionsTypes): userStateType => {
  switch (action.type) {
    case SET_USER: {
      const { userData } = action;

      return {
        ...state,
        username: userData.username,
        email: userData.email,
        image: userData.image,
        isUserProfileLoading: false,
        isLoggedIn: true,
      };
    }
    case USER_AUTH_FAILED:
      return { ...state, error: action.error };
    case USER_PROFILE_LOADING:
      return { ...state, isUserProfileLoading: true };
    case UNLOG_USER:
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        image: null,
        email: null,
      };
    default:
      return state;
  }
};

export default userReducer;
