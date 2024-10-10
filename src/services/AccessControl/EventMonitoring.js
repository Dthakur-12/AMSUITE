import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const getEventMonitoring = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.get("/AccessControl/EventsMonitor/GetEvents", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getEventsReport = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/Events", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getEventsXLS = (dataTable) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/EventsXLS", dataTable, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
      ContentType: "application/octet-stream",
      ContentDisposition: "attachment",
    },
  });
};

export const getPersonsByEnterprisesXLS = (dataTable) => {
  console.log("dataTable: ", dataTable);
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/personsByEnterprisesXLS", dataTable, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
      ContentType: "application/octet-stream",
      ContentDisposition: "attachment",
    },
  });
};

export const getEnterprisesXLS = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post(
    "/Reports/EnterprisesXLS",
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        ContentType: "application/octet-stream",
        ContentDisposition: "attachment",
      },
    }
  );
};

export const getEventById = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.get("/AccessControl/EventsMonitor/GetEventById", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getPersonImage = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.get(
    "/AccessControl/EventsMonitor/GetPersonImage",
    { id: info },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const getAccessImage = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.get(
    "/AccessControl/EventsMonitor/GetAccessImage",
    { id: info },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const API = {
  getEventMonitoring, //
  getEventById,
  getPersonImage,
  getAccessImage,
  getEventsXLS,
  getEventsReport,
  getPersonsByEnterprisesXLS,
  getEnterprisesXLS,
};

export default API;
