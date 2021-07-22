import { SET_USER, UNLOG_USER, USER_PROFILE_LOADING } from '../types/userTypes';

interface IUserState {
  username: string;
  image: null | string;
  isLoggedIn: boolean;
  isUserProfileLoading: boolean;
  isRegistrationLoading: boolean;
  email: null | string;
}
const initialState = {
  username: '',
  image: null,
  isLoggedIn: false,
  isUserProfileLoading: false,
  isRegistrationLoading: false,
  email: null,
};

const userReducer = (state = initialState, action: any): IUserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.data.username,
        email: action.data.email,
        isUserProfileLoading: false,
        isLoggedIn: true,
        image: action.data.image,
      };
    case USER_PROFILE_LOADING:
      return { ...state, isUserProfileLoading: true };
    case UNLOG_USER:
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        image: null,
        email: null,
      };
    default:
      return state;
  }
};

export default userReducer;
