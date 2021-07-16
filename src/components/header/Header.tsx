import * as styles from "./header.module.scss";
import { Button } from "antd";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import avatar from "../../img/avatar.png";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const state = useSelector((state: any) => state.userReducer);
  const history = useHistory();
  console.log(state);
  return (
    <div className={styles.header}>
      <NavLink to="/articless/1">Realworld Blog</NavLink>
      {!state.isLoggedIn ? (
        <div className={styles.right}>
          <NavLink activeClassName={styles.link} to="/sign-in">
            <Button className={`${styles.button}`}>Sign In</Button>
          </NavLink>
          <NavLink to="/sign-up" activeClassName={styles.link}>
            <Button className={`${styles.button} ${styles["second-button"]}`}>
              Sign Up
            </Button>
          </NavLink>
        </div>
      ) : (
        <div className={styles.right}>
          <Link to="/new-article">
            <Button className={styles.articleBtn}>Create article</Button>
          </Link>
          <div
            onClick={() => history.push("/profile")}
            className={styles.username}
            style={{ cursor: "pointer" }}
          >
            {state.username}
          </div>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/profile")}
            height="46"
            src={state.image || avatar}
            alt="avatar"
            className={styles.avatar}
          />
          <NavLink to="/log-out" activeClassName={styles.link}>
            <Button className={`${styles.button} ${styles["second-button"]}`}>
              Log Out
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
