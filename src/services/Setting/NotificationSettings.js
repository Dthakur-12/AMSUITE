import { create } from "apisauce";

import { TIMEOUT } from "../../Config";

import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
export const TOKEN_ANONYMOUS = "oITQ86J+s7vz7thJArHfTY0tDys28Z8lUNXtRchELkI=";

let api;

const generateControl = cant => {
  let data = [];
  for (let i = 0; i < cant; i++) {
    data.push({
      name: `Contrato ${i}`,
      id: i
    });
  }
  return data;
};

const generateEmails = cant => {
  let data = [];
  for (let i = 0; i < cant; i++) {
    data.push({
      name: `email${i}@gmail.com`,
      id: i
    });
  }
  return data;
};

export const getControlsMock = () => {
  const data = generateControl(30);
  return new Promise((resolve, reject) => {
    resolve({
      data: data
    });
  });
};

export const getControls = dataTable => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get("/Aludoc/Controls/Get", dataTable, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }
      })
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

export const getControlEmails = controlId => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/Aludoc/Controls/GetControlEmails",
        { controlId },
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
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const getControlNotifications = controlId => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/Aludoc/Controls/GetControlNotifications",
        { controlId },
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
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const setControlEmails = (controlId, emails, overrideEmailList) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .put(
        "/Aludoc/Controls/SetControlEmails/" +
          controlId +
          "/" +
          overrideEmailList,
        emails,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken")
          }
        }
      )
      .then(response => {
        if (response.ok) {
          resolve();
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else {
            reject({
              error: response.data
            });
          }
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const setControlNotifications = (controlId, notification) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post("/Aludoc/Controls/SetControlEmails", controlId, notification, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }
      })
      .then(response => {
        if (response.ok) {
          resolve();
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else {
            reject({
              error: response.data
            });
          }
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const SetControlNotificationValue = (
  controlId,
  notificationColumn,
  value
) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .put(
        "/Aludoc/Controls/SetControlNotificationValue/" +
          controlId +
          "/" +
          notificationColumn +
          "/" +
          value,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken")
          }
        }
      )
      .then(response => {
        if (response.ok) {
          resolve();
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else {
            reject({
              error: response.data
            });
          }
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const setEasyAccessSettings = notifications => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post("/AMSuite/Settings/SetEasyAccessSettings", notifications, {
        headers: {
          Authorization: "Bearer " + TOKEN_ANONYMOUS
        }
      })
      .then(response => {
        if (response.ok) {
          resolve(response.ok);
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else {
            reject({
              error: response.data
            });
          }
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const getEasyAccessSettings = notifications => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/AMSuite/Settings/GetEasyAccessSettings",
        {},
        {
          headers: {
            Authorization: "Bearer " + TOKEN_ANONYMOUS
          }
        }
      )
      .then(response => {
        if (response.ok) {
          resolve({ data: response.data });
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else {
            reject({
              error: response.data
            });
          }
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const getDaysUntilExpired = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/AMSuite/Licenses/GetDaysUntilExpired",
        {},
        {
          headers: {
            Authorization: "Bearer " + TOKEN_ANONYMOUS
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
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const getEmailsMock = () => {
  const data = generateEmails(30);
  return new Promise((resolve, reject) => {
    resolve({
      data: data
    });
  });
};

export const API = {
  getControls,
  getControlNotifications,
  getControlEmails,
  setControlEmails,
  setControlNotifications,
  SetControlNotificationValue,
  setEasyAccessSettings,
  getEasyAccessSettings,
  getControlsMock,
  getEmailsMock,
  getDaysUntilExpired
};

export default API;
