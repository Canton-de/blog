import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { unlogginUser } from "../../store/reducers/userReducer";

export interface LogOutProps {}

const LogOut: React.FC<LogOutProps> = () => {
  const state: any = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!state.isLoggedIn) history.push("/");
    localStorage.setItem("token", "");
    dispatch(unlogginUser());
  }, [history, dispatch, state.isLoggedIn]);
  return <div>unloginning...</div>;
};

export default LogOut;
