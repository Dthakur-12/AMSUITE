import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const getAccessLevels = dataTable => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/AccessControl/AccessLevels/GetAccessLevels",
        dataTable,
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

export const getAccessLevel = accessLevelId => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/AccessControl/AccessLevels/GetAccessLevel",
        { accessLevelId },
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

export const createAccessLevel = reader => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post("/AccessControl/AccessLevels/CreateAccessLevel", reader, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }
      })
      .then(response => {
        if (response.ok) {
          resolve();
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

export const editAccessLevel = reader => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .put("/AccessControl/AccessLevels/EditAccessLevel", reader, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }
      })
      .then(response => {
        if (response.ok) {
          resolve();
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

export const deleteAccessLevel = accessLevelIds => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post("/AccessControl/AccessLevels/DeleteAccessLevel", accessLevelIds, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }
      })
      .then(response => {
        if (response.ok) {
          resolve();
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

export const API = {
  getAccessLevels,
  getAccessLevel,
  createAccessLevel,
  editAccessLevel,
  deleteAccessLevel
};

export default API;
