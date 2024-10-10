import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";
import ApiHandler from "../services/ApiHandler";
import StartAmSuiteNavBar from "../utils/StartAmSuiteNavBar";
import { connectSocket, socketIO } from "../utils/WebSockets";
import { tryLogin } from "../actions/Users/user_actions";
import { addSettings } from "../actions/Settings/system_actions";
import {
  cleanVisitRequest,
  receiveVisitRequest,
} from "../actions/Notifications/systemNotifications_actions";

const Init = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentWeb = useSelector((state) => state.WebNavigation.currentWeb);
  const currentUser = useSelector((state) => state.User.currentUser);

  useEffect(() => {
    loadSettings();
    dispatch(tryLogin());
  }, [dispatch]);

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
        console.log("Error settings");
        // Handle error as needed
      });
  };

  const correctLogin = useCallback(() => {
    connectSocket();
    const handleNavigation = () => navigate("/noPermission");
    const cleanVisit = () => dispatch(cleanVisitRequest());
    const receiveVisit = () => dispatch(receiveVisitRequest());

    socketIO.emit("logIn", currentUser.id, currentUser.token);
    socketIO.on("logInValid", (data) => {
      if (data.message) {
        socketIO.emit("subscriptionNotifications", currentUser);
      }
      if (!data.message) handleNavigation();
    });

    socketIO.on("AnyVisitsToApprove", (data) => {
      if (!data.message) {
        cleanVisit();
      } else {
        receiveVisit();
      }
    });

    localStorage.setItem("userToken", currentUser.token);

    if (currentWeb >= -1) {
      navigate("/home", { state: { initialUrl: location.pathname } });
    } else if (AmSuiteNavBar.appNavigation) {
      AmSuiteNavBar.appNavigation.history.push("/home");
      AmSuiteNavBar.update();
    } else {
      StartAmSuiteNavBar.appNavigation.history.push("/home");
    }
  }, [currentUser, currentWeb, dispatch, location.pathname, navigate]);

  return <PageLoader />;
};

export default Init;
