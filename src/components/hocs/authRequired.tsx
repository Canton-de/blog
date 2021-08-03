import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import isLogged from '../../helpers/islogged';
import { stateType } from '../../store/store';

const unregisterPage = (Component: any) =>
  function fo(...props: any) {
    const history = useHistory();
    const { savedPathname } = useSelector((state: stateType) => state.history);

    useEffect(() => {
      if (!isLogged()) history.push(savedPathname);
    }, []);
    return <Component {...props} />;
  };

export default unregisterPage;
