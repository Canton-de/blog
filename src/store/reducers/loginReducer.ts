import axios from "axios";
import { loadUserData } from "./userReducer";

interface ILoginState {
  isLoading: boolean;
  loginFailed: boolean;
}

const initialState: ILoginState = {
  isLoading: false,
  loginFailed: false,
};

interface IReqUser {
  token: string;
}

interface IResData {
  user: IReqUser;
}

interface IResponse {
  data: IResData;
}

const USER_LOADING = "USER_LOADING";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGIN_OK = "LOGIN_OK";

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_FAILED:
      return { ...state, loginFailed: true, isLoading: false };
    case USER_LOADING:
      console.log(action.isLoading);
      return { ...state, isLoading: action.isLoading };
    case LOGIN_OK:
      return { ...state, isLoading: true, loginFailed: false };
    default:
      console.log(action);
      return state;
  }
};

export const userLoading = (isLoading: boolean) => ({
  type: USER_LOADING,
  isLoading,
});

const loginFailed = () => ({ type: LOGIN_FAILED });
const loginOk = () => ({ type: LOGIN_OK });
export const logInAccount = (data: any) => async (dispatch: any) => {
  dispatch(loginOk());
  try {
    const response = await axios.post<any, IResponse>(
      "https://conduit.productionready.io/api/users/login",
      {
        user: {
          email: data.email,
          password: data.password,
        },
      }
    );
    const { token } = response.data.user;
    localStorage.setItem("token", token);
    dispatch(loadUserData());
  } catch (err) {
    console.log("err");
    dispatch(loginFailed());
  }
};
export default loginReducer;
