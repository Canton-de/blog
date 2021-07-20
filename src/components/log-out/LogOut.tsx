import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { unlogginUser } from '../../store/reducers/userReducer';

export interface LogOutProps {}

const LogOut: React.FC<LogOutProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    history.go(-1);
    localStorage.setItem('token', '');
    dispatch(unlogginUser());
  }, []);
  return <div>unloginning...</div>;
};

export default LogOut;
