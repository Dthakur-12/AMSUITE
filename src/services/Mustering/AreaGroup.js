import { create } from "apisauce";
import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { TIMEOUT } from "../../Config";

let api;
export const createAreaGroup = (areaName,musterAreaGroups) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post(
        "/MusteringAreaGroup",
        { Name: areaName,musterAreaGroups:musterAreaGroups},
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

export const updateAreaGroup = (Id,areaName,musterAreaGroups) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .put(
        "/MusteringAreaGroup",
        {id:Id,Name: areaName,musterAreaGroups:musterAreaGroups,status:true},
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


export const getAreaGroup = (dataTable) => {
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
        "/MusteringAreaGroup/" + Id,
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

export const deleteAreaGroup = (idAreaGroup) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .delete(
        "/MusteringAreaGroup/" + idAreaGroup,
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



export const API = {
  createAreaGroup,
  getAreaGroup,
  deleteAreaGroup,
  updateAreaGroup
};

export default API;