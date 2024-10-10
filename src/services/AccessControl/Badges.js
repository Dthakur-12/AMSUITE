import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const getBadgeTypes = (start, length, order, search) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Badges/GetBadgeTypes",
        { start, length, order, search },
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

export const getBadgeById = badgeId => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Badges/GetBadgeById",
        { id: badgeId },
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

export const getBadgeStatus = (start, length, order, search) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Badges/GetBadgeStatus",
        { start, length, order, search },
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

export const getAllBadgeStatus = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Badges/GetAllBadgeStatus",
        {},
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

export const getAccessLevels = dataTable => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/AccessControl/AccessLevels/GetAccessLevels",
        dataTable,
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

export const createBadge = badge => {
  let currentDateDeact = new Date(badge.deactivationDate);
  let valueDeact = new Date(
    currentDateDeact.getTime() - currentDateDeact.getTimezoneOffset() * 60000
  ).toJSON();
  let currentDateAct = new Date(badge.activationDate);
  let valueAct = new Date(
    currentDateAct.getTime() - currentDateAct.getTimezoneOffset() * 60000
  ).toJSON();

  let badgeOK = {
    ...badge,
    activationDate: valueAct,
    deactivationDate: valueDeact
  };

  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post("/EasyAccess/Badges/CreateBadge", badgeOK, {
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

export const createBadgeType = badgeType => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post("/EasyAccess/Badges/CreateBadgeType", badgeType, {
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

export const editBadge = badge => {
  let currentDateDeact = new Date(badge.deactivationDate);
  let valueDeact = new Date(
    currentDateDeact.getTime() - currentDateDeact.getTimezoneOffset() * 60000
  ).toJSON();
  let currentDateAct = new Date(badge.activationDate);
  let valueAct = new Date(
    currentDateAct.getTime() - currentDateAct.getTimezoneOffset() * 60000
  ).toJSON();

  let badgeOK = {
    ...badge,
    activationDate: valueAct,
    deactivationDate: valueDeact
  };
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .put("/EasyAccess/Badges/EditBadge", badgeOK, {
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

export const deleteBadges = badges => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .delete(
        "/EasyAccess/Badges/DeleteBadges",
        {},
        {
          data: badges,
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
          else if (response.status === 405)
            resolve({
              data: response.data
            });
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
  createBadge,
  getBadgeTypes,
  getAccessLevels,
  getBadgeStatus,
  getBadgeById,
  deleteBadges,
  getAllBadgeStatus,
  editBadge,
  createBadgeType
};

export default API;
