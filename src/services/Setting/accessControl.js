import { create } from "apisauce";

import { TIMEOUT } from "../../Config";

import AmSuiteNavBar from "../../utils/AmSuiteNavBar";

let api;

export const getSettingMobileSAML = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/AMSuite/Settings/GetMobileAuthConfig",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        console.log("response: ", response);
        if (response.ok) {
          resolve({
            data: response.data,
          });
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else
            reject({
              error: response.data,
            });
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        reject({
          error: error,
        });
      });
  });
};
export const setSettingMobileSAML = (mobileAuthConfig) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post("/AMSuite/Settings/ChangeMobileAuthConfig", mobileAuthConfig, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve(response.ok);
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else {
            reject({
              error: response.data,
            });
          }
        }
      })
      .catch((error) => {
        reject({
          error: error,
        });
      });
  });
};
export const API = {
  getSettingMobileSAML,
  setSettingMobileSAML,
};

export default API;
