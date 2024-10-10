import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const getVirtualZones = ({ start, length, order, search }) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.get(
    "/AccessControl/VirtualZones/GetVirtualZones",
    { start, length, order, search },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const createVirtualZone = virtualZone => {
  let newVirtualZone = JSON.parse(JSON.stringify(virtualZone));
  virtualZone.gates.map((gate, index) => {
    newVirtualZone.gates[index].entranceReader = gate.entranceReader
      ? gate.entranceReader.value
      : 0;
    newVirtualZone.gates[index].entranceReaderName = gate.entranceReader
      ? gate.entranceReader.label
      : "";
    newVirtualZone.gates[index].exitReader = gate.exitReader
      ? gate.exitReader.value
      : 0;
    newVirtualZone.gates[index].exitReaderName = gate.exitReader
      ? gate.exitReader.label
      : "";
  });

  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.post(
    "/AccessControl/VirtualZones/CreateVirtualZone",
    newVirtualZone,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const editVirtualZone = virtualZone => {
  let newVirtualZone = JSON.parse(JSON.stringify(virtualZone));
  virtualZone.gates.map((gate, index) => {
    newVirtualZone.gates[index].entranceReader = gate.entranceReader
      ? gate.entranceReader.value
      : 0;
    newVirtualZone.gates[index].entranceReaderName = gate.entranceReader
      ? gate.entranceReader.label
      : "";
    newVirtualZone.gates[index].exitReader = gate.exitReader
      ? gate.exitReader.value
      : 0;
    newVirtualZone.gates[index].exitReaderName = gate.exitReader
      ? gate.exitReader.label
      : "";
  });

  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.put(
    "/AccessControl/VirtualZones/EditVirtualZone",
    newVirtualZone,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const deleteVirtualZone = virtualZones => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.delete(
    "/AccessControl/VirtualZones/DeleteVirtualZone",
    {},
    {
      data: virtualZones,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const getVirtualZoneById = id => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/AccessControl/VirtualZones/GetVirtualZoneById",
        { id },
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

export const API = {
  getVirtualZones, //
  createVirtualZone, //
  getVirtualZoneById,
  deleteVirtualZone,
  editVirtualZone
};

export default API;
