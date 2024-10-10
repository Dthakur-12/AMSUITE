import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Init from "./Init";
import Home from "./Home";
import WebDrawer from "./WebDrawer";
import Login from "./Login";
import withLogin from "../core/session/withLogin";
import Unauthorized from "../webApps/Shared/Unauthorized";
import StartAmSuiteNavBar from "../utils/StartAmSuiteNavBar";
import ErrorPage from "../webApps/Shared/ErrorPage";
import NoPermission from "../webApps/Shared/NoPermission";
import withAutoRegister from "../core/EasyAccess/withAutoRegister";
import AutoRegister from "../webApps/EasyAccess/Components/Register/AutoRegister";
import LoginSAML from "./LoginSAML";

const PrivateRoute = ({
  element,
  isLogin,
  isLoginFunction,
  isLogoutFunction,
}) => {
  return localStorage.getItem("userToken") !== null ||
    window.location.pathname === "/home" ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

const LoginWrapper = withLogin(Login);
const AutoRegisterWrapper = withAutoRegister(AutoRegister);

class StartNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router ref={(e) => StartAmSuiteNavBar.setAppNavigation(e)}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute
                element={<Init />}
                isLoginFunction={this.props.isLoginFunction}
                isLogoutFunction={this.props.isLogoutFunction}
                isLogin={this.props.isLogin}
              />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute
                element={<WebDrawer />}
                isLoginFunction={this.props.isLoginFunction}
                isLogoutFunction={this.props.isLogoutFunction}
                isLogin={this.props.isLogin}
              />
            }
          />
          <Route path="/login" element={<LoginWrapper/>} />
          <Route path="/home/:token" element={<LoginSAML />} />
          <Route
            path="/unauthorized"
            element={
              <Unauthorized
                isLoginFunction={this.props.isLoginFunction}
                isLogoutFunction={this.props.isLogoutFunction}
                isLogin={this.props.isLogin}
              />
            }
          />
          <Route
            path="/noPermission"
            element={
              <NoPermission
                isLoginFunction={this.props.isLoginFunction}
                isLogoutFunction={this.props.isLogoutFunction}
                isLogin={this.props.isLogin}
              />
            }
          />
          <Route path="/serverError" element={<ErrorPage />} />
          <Route
            path="/autoregister"
            element={
              <AutoRegisterWrapper
                isLoginFunction={this.props.isLoginFunction}
                isLogoutFunction={this.props.isLogoutFunction}
                isLogin={this.props.isLogin}
              />
            }
          />
          <Route path="*" element={<Init />} />
        </Routes>
      </Router>
    );
  }
}

export default StartNavigation;
