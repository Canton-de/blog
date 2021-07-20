import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import unregisterPage from '../hocs/unregisterPage';
import { loadCurUserProfile } from '../../store/reducers/userReducer';
import Api from '../../api/api';

import * as styles from './registration-page.module.scss';

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
  repeatPassword: yup.string().equals([yup.ref('password')], 'passwords must match'),
  checkAgree: yup.boolean().equals([true], 'You must confirm').required(),
});

const api = new Api();

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();
  const [serverErrors, setServerErrors] = useState<Partial<IServerErrors>>({});
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);
  const { isLoggining } = useSelector((state: any) => state.loginReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'all', resolver: yupResolver(SignupSchema) });
  const onSubmit = async (data: IUserForm) => {
    setIsRegistrationLoading(true);
    try {
      const regData = await api.register(data);
      const { token } = regData.data.user;
      localStorage.setItem('token', token);
      dispatch(loadCurUserProfile());
    } catch (e) {
      setServerErrors(e.response?.data?.errors);
      setIsRegistrationLoading(false);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length) {
      setServerErrors({});
    }
  }, [errors, isLoggining]);
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className={styles.pageWrapper}>
        <div className={styles.page}>
          <div className={styles.title}>Create new account</div>
          <label htmlFor="username" className={styles.subtitle}>
            Username
          </label>
          <input
            className={serverErrors.username || errors.username ? styles.inputError : styles.input}
            type="text"
            id="username"
            placeholder="Username"
            {...register('username')}
          />
          <p className={styles.error}>
            {errors.username?.message}
            {serverErrors?.username?.join(', ')}
          </p>
          <label htmlFor="email" className={styles.subtitle}>
            Email address
          </label>
          <input
            className={serverErrors.email || errors.email ? styles.inputError : styles.input}
            id="email"
            type="text"
            {...register('email')}
            placeholder="Email address"
          />
          <p className={styles.error}>
            {errors.email?.message}
            {serverErrors?.email?.join(', ')}
          </p>
          <label htmlFor="password" className={styles.subtitle}>
            Password
          </label>
          <input
            className={serverErrors.password || errors.password ? styles.inputError : styles.input}
            id="password"
            type="password"
            {...register('password')}
            placeholder="Password"
          />
          <p className={styles.error}>
            {errors.password?.message}
            {serverErrors.password?.join(', ')}
          </p>
          <label htmlFor="repeatPassword" className={styles.subtitle}>
            Repeat password
          </label>
          <input
            className={errors.repeatPassword ? styles.inputError : styles.input}
            id="repeatPassword"
            type="password"
            {...register('repeatPassword')}
            placeholder="Repeat Password"
          />
          <p className={styles.error}>{errors.repeatPassword?.message}</p>
          <input {...register('checkAgree')} type="checkbox" id="checkAgree" />
          <label htmlFor="checkAgree" className={styles.labelAgree}>
            I agree to the processing of my personal information
          </label>
          <p className={styles.error}>{errors.checkAgree?.message}</p>
          <Button
            disabled={isRegistrationLoading || isLoggining}
            htmlType="submit"
            type="primary"
            style={{ width: '100%' }}
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};

export default unregisterPage(RegistrationPage, true);
