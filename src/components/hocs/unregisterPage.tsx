import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const unregisterPage = (Component: any, shouldRegister: boolean) => {
  return function C(...props: any) {
    console.log(props);
    const token = localStorage.getItem("token");
    if (!!token === shouldRegister) return <Redirect to="/" />;
    return <Component {...props} />;
  };
};

export default unregisterPage;
