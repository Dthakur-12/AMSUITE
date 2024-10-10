import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";

import { TIMEOUT } from "../../Config";

let api;
export const getPrinters = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/Tikas/Orders/GetPrinters",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken")
          }
        }
      )
      .then(response => {
        if (response.ok) {
          resolve({
            data: response.data
          });
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else
            reject({
              error: response.data
            });
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};
export const createPrinter = printerName => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post(
        "/Tikas/Orders/CreatePrinter",
        { name: printerName },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken")
          }
        }
      )
      .then(response => {
        if (response.ok) {
          resolve();
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else {
            reject({
              error: response.data
            });
          }
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const deletePrinter = printerIds => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .delete(
        "/Tikas/Orders/DeletePrinter",
        {},
        {
          data: printerIds,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken")
          }
        }
      )
      .then(response => {
        if (response.ok) {
          resolve();
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else if (response.status === 405)
            resolve({
              data: response.data
            });
          else
            reject({
              error: response.data
            });
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const API = {
  getPrinters,
  deletePrinter,
  createPrinter
};

export default API;
