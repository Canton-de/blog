import "./App.less";
import { Switch, Route } from "react-router";
import Articles from "../articles/Articles";
import Header from "../header/Header";
import ArticlePage from "../article-page/ArticlePage";
import RegistrationPage from "../registration-page/RegistrationPage";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "../../store/reducers/userReducer";
import { useEffect } from "react";
import LoginPage from "../login-page/LoginPage";
import LogOut from "../log-out/LogOut";
import ChangeProfile from "../change-profile/ChangeProfile";
import CreateArticle from "../create-article/CreateArticle";
import EditArticle from "../edit-article/EditArticle";

export interface ChildProps {
  count: number;
}

function App() {
  const dispatch = useDispatch();
  const state: any = useSelector((state) => state);
  useEffect(() => {
    if (state.isLoggedIn) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(loadUserData());
  }, [dispatch, state.isLoggedIn]);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/articless/:page" exact component={Articles} />
        <Route path="/articles/:slug" exact component={ArticlePage} />
        <Route path="/articles/:slug/edit" component={EditArticle} />
        <Route path="/sign-up" component={RegistrationPage} />
        <Route path="/sign-in" component={LoginPage} />
        <Route path="/log-out" component={LogOut} />
        <Route path="/profile" component={ChangeProfile} />
        <Route path="/new-article" component={CreateArticle} />
        <div>404 Page not found</div>
      </Switch>
    </div>
  );
}

export default App;
