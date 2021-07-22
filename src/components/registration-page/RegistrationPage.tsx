import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import unregisterPage from '../hocs/unregisterPage';

import * as styles from './registration-page.module.scss';
import registerAccount from '../../store/actions/registerActions';

export interface IUserForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  checkAgree: boolean;
}

const SignupSchema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  repeatPassword: yup.string().equals([yup.ref('password')], 'passwords must match'),
  checkAgree: yup.boolean().equals([true], 'You must confirm').required(),
});

const RegistrationPage: React.FC = () => {
  const { isRegistating, serverErrors } = useSelector((state: any) => state.registerReducer);
  const { isLoggining } = useSelector((state: any) => state.loginReducer);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'all', resolver: yupResolver(SignupSchema) });
  const onSubmit = async (data: IUserForm) => {
    dispatch(registerAccount(data));
  };
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
            disabled={isRegistating || isLoggining}
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
