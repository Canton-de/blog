import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import isLogged from '../../helpers/islogged';

const unregisterPage = (Component: any, isAuthRequire: boolean) =>
  function fo(...props: any) {
    const history = useHistory();
    const { savedPathname } = useSelector((state: any) => state.historyReducer);

    useEffect(() => {
      if (isLogged() === isAuthRequire) history.push(savedPathname);
    }, []);
    return <Component {...props} />;
  };

export default unregisterPage;
