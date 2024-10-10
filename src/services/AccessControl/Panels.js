import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const getPanels = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.get("/AccessControl/Panels/GetPanels", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getRoutes = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.get("/AccessControl/Panels/GetRoutes", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getPanelById = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.get(
    "/AccessControl/Panels/GetPanelById",
    { id: info },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const createPanel = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/AccessControl/Panels/CreateMobilePanel", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const editPanel = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/AccessControl/Panels/UpdateMobilePanel", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const deletePanel = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/AccessControl/Panels/DeletePanel", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const logOff = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.post(
    "/AccessControl/Panels/LogOff",
    { panelId: info },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const getMobilePanels = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.get("/AccessControl/Panels/GetMobilePanels", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const historicalTracking = (info) => {
  // let currentDateEnd = new Date(info.EndDate);
  // let valueEnd = new Date(
  //   currentDateEnd.getTime() - currentDateEnd.getTimezoneOffset() * 60000
  // ).toJSON();
  // let currentDateInit = new Date(info.StartDate);
  // let valueInit = new Date(
  //   currentDateInit.getTime() - currentDateInit.getTimezoneOffset() * 60000
  // ).toJSON();

  // let infoOK = {
  //   ...info,
  //   StartDate: valueInit,
  //   EndDate: valueEnd
  // };
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.get("/AccessControl/Devices/HistoricalTracking", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getReaderModes = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.get("/AccessControl/Panels/GetReaderModes", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getWorkingModes = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.get(
    "/AccessControl/Panels/GetWorkingModes",
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const createBusCapacity = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/AccessControl/Panels/CreateBusCapacity", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const updateBusCapacity = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/AccessControl/Panels/UpdateBusCapacity", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const deleteBusCapacity = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/AccessControl/Panels/DeleteBusCapacity", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getBusCapacities = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.get("/AccessControl/Panels/GetBusCapacities", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const createOrUpdateRoute = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.post("/AccessControl/Panels/CreateOrUpdateRoute", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};
export const deleteRoutes = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.post("/AccessControl/Panels/DeleteRoutes", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const API = {
  createPanel,
  editPanel,
  deletePanel,
  getPanels,
  getPanelById,
  logOff,
  getMobilePanels,
  historicalTracking,
  getReaderModes,
  getWorkingModes,
  getRoutes,
  createBusCapacity,
  getBusCapacities,
  updateBusCapacity,
  deleteBusCapacity,
  createOrUpdateRoute,
  deleteRoutes,
};

export default API;
