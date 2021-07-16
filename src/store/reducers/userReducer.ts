import axios from "axios";
import { userLoading } from "./loginReducer";

const initialState = {
  username: "",
  image: null,
  isLoggedIn: false,
  isDataLoading: true,
  isRegistrationLoading: false,
  email: null,
};

const SET_USER = "SET_USER";
const DATA_LOADING = "DATA_LOADING";
const UNLOG_USER = "UNLOG_USER";

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.data.username,
        email: action.data.email,
        isDataLoading: false,
        isLoggedIn: true,
        image: action.data.image,
      };
    case DATA_LOADING:
      console.log(action);
      return { ...state, isDataLoading: action.isLoading };
    case UNLOG_USER:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

const loading = (isLoading: boolean) => ({ type: DATA_LOADING, isLoading });

const setUser = (data: any) => ({
  type: SET_USER,
  data,
});

export const unlogginUser = () => ({ type: UNLOG_USER });

export const loadUserData = () => (dispatch: any) => {
  dispatch(loading(true));
  dispatch(userLoading(true));
  const token = localStorage.getItem("token");
  console.log("qqq");
  axios
    .get("https://conduit.productionready.io/api/user", {
      withCredentials: true,
      headers: {
        Authorization: `Token ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    })
    .then((data: any) => {
      console.log(data);
      dispatch(setUser(data.data.user));
      dispatch(userLoading(false));
    });
};

export default userReducer;
