import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const getImeis = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.get("/AccessControl/Devices/GetIMEIs", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const createImei = (imei) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post(
    "/AccessControl/Devices/CreateIMEI",
    { value: imei },
    {
      headers: {
        ContentType: "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const editImei = (imei) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/AccessControl/Devices/UpdateIMEI", imei, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const deleteImei = (imeiIds) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post("/AccessControl/Devices/DeleteIMEI", imeiIds, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve({ data: response.data });
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
  getImeis, //
  createImei,
  deleteImei, //
  editImei, //
};

export default API;
