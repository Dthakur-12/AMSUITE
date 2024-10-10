import { create } from "apisauce";

import { setUrlApi, TIMEOUT } from "../../Config";
import StartAmSuiteNavBar from "../../utils/StartAmSuiteNavBar";
import { clearStorage } from "../../utils/Utils";

let api;

export const login = (login) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
  return api.post("/AMSuite/Sessions/Login", login);
};

export const loginActiveDirectory = (login) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
  return new Promise((resolve, reject) => {
    api
      .post("/AMSuite/Sessions/LoginActiveDirectory", login)
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          });
        } else {
          if (response.problem === "NETWORK_ERROR")
            StartAmSuiteNavBar.appNavigation.history.push("/serverError", {
              homeUrl: "login",
              redirectUrl: "login",
            });
          else
            reject({
              error: response.data,
            });
        }
      })
      .catch((error) => {
        reject({
          error: error,
        });
      });
  });
};

export const logout = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
  api.post("/AMSuite/Sessions/Logout");
};

export const getCurrentUser = (token) => {
  token = token ? token : localStorage.getItem("userToken");
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
    headers: { Authorization: "Bearer " + token },
  });
  return new Promise((resolve, reject) => {
    api
      .get("/AMSuite/Sessions/CurrentSession")
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          });
        } else {
          clearStorage()
          // localStorage.clear();
          setUrlApi();
          StartAmSuiteNavBar.appNavigation.history.push("/");
          reject({
            error: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("getCurrentUser error: ", error);
        reject({
          error: error,
        });
      });
  });
};

export const API = {
  login,
  logout,
  getCurrentUser,
  loginActiveDirectory,
};

export default API;
