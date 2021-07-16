import { useForm } from "react-hook-form";
import * as styles from "./registration-page.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "antd";
import axios from "axios";
import { Redirect, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import unregisterPage from "../hocs/unregisterPage";
import { loadUserData } from "../../store/reducers/userReducer";
import Api from "../../api/api";
import { useEffect } from "react";

export interface IUserForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  checkAgree: boolean;
}

interface IServerErrors {
  username: string[];
  email: string[];
  password: string[];
}

const SignupSchema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(40).required(),
  repeatPassword: yup
    .string()
    .equals([yup.ref("password")], "passwords must match"),
  checkAgree: yup.boolean().equals([true], "You must confirm").required(),
});

const api = new Api();

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();
  const [serverErrors, setServerErrors] = useState<Partial<IServerErrors>>({});
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);
  const isLoading = useSelector((state: any) => state.userReducer);
  console.log(isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: "all", resolver: yupResolver(SignupSchema) });
  const onSubmit = async (data: IUserForm) => {
    setIsRegistrationLoading(true);
    try {
      const regData = await api.register(data);
      const { token } = regData.data.user;
      localStorage.setItem("token", token);
      dispatch(loadUserData());
    } catch (e) {
      setServerErrors(e.response.data.errors);
      setIsRegistrationLoading(false);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length) {
      setServerErrors({});
    }
  }, [errors]);
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className={styles.pageWrapper}>
        <div className={styles.page}>
          <div className={styles.title}>Create new account</div>
          <label htmlFor="username" className={styles.subtitle}>
            Username
          </label>
          <input
            className={
              serverErrors.username || errors.username
                ? styles.inputError
                : styles.input
            }
            type="text"
            id="username"
            placeholder="Username"
            {...register("username")}
          />
          <div className={styles.errors}>
            {errors.username?.message}
            {serverErrors.username?.join(", ")}
          </div>
          <label htmlFor="email" className={styles.subtitle}>
            Email address
          </label>
          <input
            className={
              serverErrors.email || errors.email
                ? styles.inputError
                : styles.input
            }
            id="email"
            type="text"
            {...register("email")}
            placeholder="Email address"
          />
          <div className={styles.errors}>
            {errors.email?.message}
            {serverErrors.email?.join(", ")}
          </div>
          <label htmlFor="password" className={styles.subtitle}>
            Password
          </label>
          <input
            className={
              serverErrors.password || errors.password
                ? styles.inputError
                : styles.input
            }
            id="password"
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          <div className={styles.errors}>
            {errors.password?.message}
            {serverErrors.password?.join(", ")}
          </div>
          <input
            className={errors.repeatPassword ? styles.inputError : styles.input}
            id="repeatPassword"
            type="password"
            {...register("repeatPassword")}
            placeholder="Repeat Password"
          />
          <div className={styles.errors}>{errors.repeatPassword?.message}</div>
          <input {...register("checkAgree")} type="checkbox" id="checkAgree" />
          <label htmlFor="checkAgree" className={styles.labelAgree}>
            I agree to the processing of my personal information
          </label>
          <div className={styles.errors}>{errors.checkAgree?.message}</div>
          <Button
            disabled={isRegistrationLoading}
            htmlType="submit"
            type="primary"
            style={{ width: "100%" }}
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};

export default unregisterPage(RegistrationPage, true);
