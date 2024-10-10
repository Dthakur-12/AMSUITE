import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";
import ApiHandler from "../services/ApiHandler";
import AmSuiteNavBar from "../utils/AmSuiteNavBar";
import StartAmSuiteNavBar from "../utils/StartAmSuiteNavBar";
import { connectSocket, socketIO } from "../utils/WebSockets";
import { tryLogin } from "../actions/Users/user_actions";
import { addSettings } from "../actions/Settings/system_actions";

const Init = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentWeb = useSelector((state) => state.WebNavigation.currentWeb);
  const currentUser = useSelector((state) => state.User.currentUser);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("userToken", decodeURIComponent(token));
      dispatch(tryLogin(decodeURIComponent(token)));
      navigate("/");
    } else {
      dispatch(tryLogin());
    }
    loadSettings();
  }, [dispatch, location.search, navigate]);

  useEffect(() => {
    if (currentUser) {
      correctLogin();
    }
  }, [currentUser]);

  const loadSettings = () => {
    ApiHandler.Setting.Setting.getSettings()
      .then(({ data }) => {
        dispatch(addSettings(data));
      })
      .catch(() => {
        // Handle error (e.g., navigate to error page or clear localStorage)
      });
  };

  const correctLogin = () => {
    if (currentUser) {
      socketIO.emit("logIn", currentUser.id, currentUser.token);
      localStorage.setItem("userToken", currentUser.token);

      if (currentWeb >= -1) {
        navigate("/home", { state: { initialUrl: location.pathname } });
      } else if (AmSuiteNavBar.appNavigation) {
        AmSuiteNavBar.appNavigation.history.push("/home");
        AmSuiteNavBar.update();
      } else {
        StartAmSuiteNavBar.appNavigation.history.push("/home");
      }
    }
  };

  return <PageLoader />;
};

export default Init;
