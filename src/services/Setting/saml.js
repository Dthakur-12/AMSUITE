import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const saveCredential = (file) => {
  const form = new FormData();
  form.append("file", file);
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/AMSuite/Settings/SaveSamlCredential", form, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const loginSAML = (payload) => {
  // const form = new FormData();
  // form.append("file", file);
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.get("/AMSuite/Sessions/loginSAML", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
      "Content-Type": "multipart/form-data",
    },
  });
};
