//import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";

import { TIMEOUT } from "../../Config";

let api;

export const getStatus = info => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.get("/EasyAccess/Status/GetStatus", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }
  });
};

export const getStatusByID = id => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.get(
    "/EasyAccess/Status/GetStatusById",
    { id },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const createStatus = status => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.post("/EasyAccess/Status/Create", status, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }
  });
};

export const editStatus = status => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.put("/EasyAccess/Status/Edit", status, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }
  });
};

export const deleteStatus = info => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });

  return api.delete(
    "/EasyAccess/Status/DeleteStatus",
    {},
    {
      data: info,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const API = {
  getStatus,
  createStatus,
  editStatus,
  getStatusByID,
  deleteStatus
};

export default API;
