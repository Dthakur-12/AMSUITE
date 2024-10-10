import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const getTrips = (dataTable) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/Trip", dataTable, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getBusTickets = (dataTable) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/BusTickets", dataTable, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const downloadTripsXLS = (dataTable) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/TripsXLS", dataTable, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
      ContentType: "application/octet-stream",
      ContentDisposition: "attachment",
    },
  });
};

export const downloadTripsWithSeatsXLS = (dataTable) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/TripsWithSeatsXLS", dataTable, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
      ContentType: "application/octet-stream",
      ContentDisposition: "attachment",
    },
  });
};

export const downloadBusTicketsXLS = (dataTable) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/BusTicketsXLS", dataTable, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
      ContentType: "application/octet-stream",
      ContentDisposition: "attachment",
    },
  });
};

export const generalTripsXLSX = (data) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/GeneralTripsXLSX", data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
      ContentType: "application/octet-stream",
      ContentDisposition: "attachment",
    },
  });
};

export const suncorTripsXLSX = (data) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/Reports/TripsTraceXLS", data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
      ContentType: "application/octet-stream",
      ContentDisposition: "attachment",
    },
  });
};

export const API = {
  getTrips, //
  getBusTickets,
  downloadTripsXLS,
  downloadBusTicketsXLS,
  generalTripsXLSX,
  downloadTripsWithSeatsXLS,
  suncorTripsXLSX,
};

export default API;
