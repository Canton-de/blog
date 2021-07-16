import { Button } from "antd";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loadUserData } from "../../store/reducers/userReducer";
import unregisterPage from "../hocs/unregisterPage";
import * as styles from "./login-page.module.scss";
import { useEffect } from "react";
import { logInAccount } from "../../store/reducers/loginReducer";
import Api from "../../api/api";
import { Link } from "react-router-dom";

export interface LoginPageProps {}

interface IForm {
  email: string;
  password: string;
}

const LoginPage: React.FC<LoginPageProps> = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loginReducer.isLoading);
  const loginFailed = useSelector(
    (state: any) => state.loginReducer.loginFailed
  );
  useEffect(() => console.log("state", isLoading));
  const onSubmit = (data: IForm) => {
    dispatch(logInAccount(data));
  };

  const { handleSubmit, reset, register } = useForm<IForm>();
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className={styles.pageWrapper}>
        <div className={styles.page}>
          <div className={styles.title}>Sign in</div>
          <label htmlFor="email" className={styles.subtitle}>
            Email address
          </label>
          <input
            className={styles.input}
            id="email"
            type="text"
            placeholder="Email address"
            {...register("email")}
          />
          <label htmlFor="password" className={styles.subtitle}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="Password"
            {...register("password")}
          />
          <Button
            disabled={isLoading}
            htmlType="submit"
            type="primary"
            style={{ width: "100%" }}
          >
            Login
          </Button>
          {loginFailed ? (
            <div>Проверьте логин и пароль на правильность.</div>
          ) : null}
          <div className={styles.signUp}>
            Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default unregisterPage(LoginPage, true);
