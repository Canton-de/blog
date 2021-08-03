import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { unlogginUser } from '../../store/actions/userActions';

const LogOut: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    history.go(-1);
    localStorage.removeItem('token');
    dispatch(unlogginUser());
  }, []);
  return <div>unloginning...</div>;
};

export default LogOut;
