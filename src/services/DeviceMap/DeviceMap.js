import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const getPanelsPosition = (filters) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get("/AccessControl/GPS/GetPanelsPosition", filters, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
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
        reject({
          error: error,
        });
      });
  });
};

export const API = {
  getPanelsPosition,
};

export default API;
