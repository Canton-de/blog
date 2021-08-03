/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from 'antd';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import * as styles from './header.module.scss';
import avatar from '../../img/avatar.png';
import savePathname from '../../store/actions/historyActions';
import { stateType } from '../../store/store';

const Header: React.FC = () => {
  const { isLoggedIn, username, image } = useSelector((state: stateType) => state.user);
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const onLogin = () => {
    dispatch(savePathname(pathname));
    history.push('/sign-in');
  };
  return (
    <div className={styles.header}>
      <NavLink to="/articles/page/1">Realworld Blog</NavLink>
      <div className={styles.right}>
        {!isLoggedIn ? (
          <>
            <Button className={styles.button} onClick={onLogin}>
              Sign In
            </Button>
            <NavLink to="/sign-up" activeClassName={styles.link}>
              <Button className={`${styles.button} ${styles['second-button']}`}>Sign Up</Button>
            </NavLink>
          </>
        ) : (
          <>
            <Link to="/new-article">
              <Button className={styles.articleBtn}>Create article</Button>
            </Link>
            <div
              onClick={() => history.push('/profile')}
              className={styles.username}
              style={{ cursor: 'pointer' }}
            >
              {username}
            </div>
            <img
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/profile')}
              height="46"
              src={image || avatar}
              alt="avatar"
              className={styles.avatar}
            />
            <NavLink to="/log-out" activeClassName={styles.link}>
              <Button className={`${styles.button} ${styles['second-button']}`}>Log Out</Button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
