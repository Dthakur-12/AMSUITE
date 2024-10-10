import { create } from "apisauce";

import { TIMEOUT } from "../../Config";

let api;

export const getAll = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.get(
    "/EasyAccess/TermsAndConditions/Get",
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const insert = value => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.post(
    "/EasyAccess/TermsAndConditions/Create",
    { value },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const API = {
  getAll,
  insert
};

export default API;
