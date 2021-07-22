import './App.less';
import { Switch, Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Articles from '../articles/Articles';
import Header from '../header/Header';
import ArticlePage from '../article-page/FullArticle';
import RegistrationPage from '../registration-page/RegistrationPage';
import LoginPage from '../login-page/LoginPage';
import LogOut from '../log-out/LogOut';
import ChangeProfile from '../change-profile/ChangeProfile';
import CreateArticle from '../create-article/CreateArticle';
import EditArticle from '../edit-article/EditArticle';
import isLogged from '../../helpers/islogged';
import Loader from '../loader/Loader';
import { loadCurUserProfile } from '../../store/actions/userActions';

export interface ChildProps {
  count: number;
}

function App() {
  const dispatch = useDispatch();
  const isUserProfileLoading = useSelector((state: any) => state.userReducer.isUserProfileLoading);
  useEffect(() => {
    if (!isLogged()) return;
    dispatch(loadCurUserProfile());
  }, []);
  return (
    <div className="App">
      {isUserProfileLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Switch>
            <Route path="/" exact component={Articles} />
            <Route path="/articles/page/:page" exact component={Articles} />
            <Route path="/articles/:slug" exact component={ArticlePage} />
            <Route path="/articles/:slug/edit" component={EditArticle} />
            <Route path="/sign-up" component={RegistrationPage} />
            <Route path="/sign-in" component={LoginPage} />
            <Route path="/log-out" component={LogOut} />
            <Route path="/profile" component={ChangeProfile} />
            <Route path="/new-article" component={CreateArticle} />
            <div className="not-found">404 Page not found</div>
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
