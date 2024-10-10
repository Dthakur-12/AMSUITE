import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const getMessages = info => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });

  return api.post("/AccessControl/Devices/Messages", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }
  });
};

export const getMessagesCount = info => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.get(
    "/AccessControl/Devices/MessagesToServerCount",
    { fromDate: info },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const sendMessage = message => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.post("/AccessControl/Devices/SendMessage", message, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }
  });
};

export const API = {
  getMessages,
  sendMessage,
  getMessagesCount
};

export default API;
