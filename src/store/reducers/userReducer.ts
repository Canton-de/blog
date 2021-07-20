import Api from '../../api/api';

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

const SET_USER = 'SET_USER';
const USER_PROFILE_LOADING = 'USER_PROFILE_LOADING';
const UNLOG_USER = 'UNLOG_USER';

const api = new Api();

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

export default userReducer;
