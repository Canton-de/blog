import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import isLogged from '../../helpers/islogged';
import { stateType } from '../../store/store';

type BaseProps = {};

const unregisterPage = (Component: React.FC<BaseProps>): React.FC =>
  function AuthNoReq(props: BaseProps) {
    const history = useHistory();
    const { savedPathname } = useSelector((state: stateType) => state.history);

    useEffect(() => {
      if (isLogged() && (savedPathname === '/sign-in' || savedPathname === '/sign-up')) {
        history.push('/');
        return;
      }
      if (isLogged()) history.push(savedPathname);
    }, []);
    return <Component {...props} />;
  };

export default unregisterPage;
