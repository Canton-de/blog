import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as styles from './change-profile.module.scss';
import api from '../../api/api';
import authRequired from '../hocs/authRequired';
import { loadCurUserProfile } from '../../store/actions/userActions';

export interface ChangeProfileProps {}

interface IForm {
  username: string;
  email: string;
  password: string;
  image: string;
}

const ChangeSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40),
  image: yup.string().url(),
});

const ChangeProfile: React.FC<ChangeProfileProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setIsFailed(false);
      const newData: any = {};
      for (const i in data) {
        if (data[i]) newData[i] = data[i];
      }
      await api.updateUser(newData);
      dispatch(loadCurUserProfile());
      history.push('/articles/page/1');
    } catch (err) {
      setIsFailed(true);
      setIsLoading(false);
    }
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IForm>({ mode: 'all', resolver: yupResolver(ChangeSchema) });
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className={styles.pageWrapper}>
        <div className={styles.page}>
          <div className={styles.title}>Edit Profile</div>
          <label htmlFor="username" className={styles.subtitle}>
            Username
          </label>
          <input
            id="username"
            type="text"
            className={styles.input}
            placeholder="Username"
            {...register('username')}
          />
          <p className={styles.error}>{errors.username?.message}</p>
          <label htmlFor="email" className={styles.subtitle}>
            Email address
          </label>
          <input
            className={styles.input}
            id="email"
            type="text"
            placeholder="Email address"
            {...register('email')}
          />
          <p className={styles.error}>{errors.email?.message}</p>
          <label htmlFor="password" className={styles.subtitle}>
            New Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="New Password"
            {...register('password')}
          />
          <p className={styles.error}>{errors.password?.message}</p>
          <label htmlFor="avatar" className={styles.subtitle}>
            Avatar image (url)
          </label>
          <input
            id="avatar"
            type="text"
            className={styles.input}
            placeholder="Avatar image"
            {...register('image')}
          />
          <p className={styles.error}>{errors.image?.message}</p>
          <Button disabled={isLoading} htmlType="submit" type="primary" style={{ width: '100%' }}>
            Save
          </Button>
          {isFailed ? <div>Произошла ошибка.</div> : null}
        </div>
      </div>
    </form>
  );
};

export default authRequired(ChangeProfile);
