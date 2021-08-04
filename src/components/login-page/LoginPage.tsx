import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import noAuthRequired from '../hocs/noAuthRequired';
import * as styles from './login-page.module.scss';
import logInAccount from '../../store/actions/loginActions';
import { stateType } from '../../store/store';
import { ILoginForm } from '../../models/loginPageModel';

const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoggining, loginFailed } = useSelector((state: stateType) => state.login);
  const { isRegistrating } = useSelector((state: stateType) => state.register);
  const onSubmit = (data: ILoginForm) => {
    dispatch(logInAccount(data));
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: 'all',
    resolver: yupResolver(LoginSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className={styles.pageWrapper}>
        <div className={styles.page}>
          <div className={styles.title}>Sign in</div>
          <label htmlFor="email" className={styles.subtitle}>
            Email address
          </label>
          <input
            className={errors.email ? styles.inputError : styles.input}
            id="email"
            type="text"
            placeholder="Email address"
            {...register('email')}
          />
          <p className={styles.error}>{errors?.email?.message}</p>
          <label htmlFor="password" className={styles.subtitle}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={errors.password ? styles.inputError : styles.input}
            placeholder="Password"
            {...register('password')}
          />
          <p className={styles.error}>{errors?.password?.message}</p>
          <Button
            disabled={isLoggining || isRegistrating}
            htmlType="submit"
            type="primary"
            style={{ width: '100%' }}
          >
            {isLoggining ? 'Logining...' : 'Login'}
          </Button>
          {loginFailed ? (
            <div className={styles.error}>Проверьте логин и пароль на правильность.</div>
          ) : null}
          <div className={styles.signUp}>
            Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default noAuthRequired(LoginPage);
