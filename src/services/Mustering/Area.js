import { create } from "apisauce";
import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { TIMEOUT } from "../../Config";

let api;

export const getArea = (dataTable) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  let Id;
  if(typeof dataTable === "object"){
    Id=0;
  } else {
    Id=dataTable;
  }
  return new Promise((resolve, reject) => {
    api
      .get(
        `/MusteringArea/${Id}`,
        dataTable,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          });
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch((error) => {
        reject({
          error: error,
        });
      });
  });
};


export const deleteArea = (idArea) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .delete(
        "/MusteringArea/" + idArea,
        { },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          });
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch((error) => {
        reject({
          error: error,
        });
      });
  });
};


export const createArea = (areaName, zones) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post(
        "/MusteringArea",
        { Name: areaName, Zone: zones },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
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

export const editArea = (areaName,zones,areaId) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .put(
        "/MusteringArea",
        { id: areaId, Name: areaName, Zone: zones,status:true},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
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
  getArea,
  deleteArea,
  createArea,
  editArea
};

export default API;