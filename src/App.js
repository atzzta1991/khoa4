import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import About from "./pages/About/About";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoListRedux from "./pages/ToDoList/ToDoListRedux";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";
import UserLoginTemplate from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import { useDispatch } from "react-redux";
import { ADD_HISTORY } from "./redux/constants/Cyberbugs/Cyberbugs";
import CyberbugsTemplate from "./templates/HomeTemplate/CyberbugsTemplate";
import IndexCyberbugs from "./pages/CyberBugs/IndexCyberbugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DrawerCyberbugs from "./HOC/Cyberbugs/DrawerCyberbugs/DrawerCyberbugs";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ADD_HISTORY,
      history,
    });
  }, []);
  return (
    <>
      <LoadingComponent />
      <DrawerCyberbugs />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/todolistrcc" component={ToDoList} />
        <Route exact path="/todolistrfc" component={ToDoListRFC} />
        <Route exact path="/todolistredux" component={ToDoListRedux} />
        <Route exact path="/todolistsaga" component={BaiTapToDoListSaga} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={IndexCyberbugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
