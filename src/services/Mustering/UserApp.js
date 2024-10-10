import { create } from "apisauce";

import { TIMEOUT } from "../../Config";

let api;
export const getAllUserApp = (start, length, search, order) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/Mustering/UserApp/GetAllUserApp",
        { Start: start, Length: length, Search: search, Order: order },
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
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const getUserApp = id => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/Mustering/UserApp/GetUserApp",
        { UserId: id },
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
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const getAllApp = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/Mustering/UserApp/GetAllApp",
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
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const createUserApp = UserApp => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post(
        "/Mustering/UserApp/InsertUserApp",
        {
          Name: UserApp.name,
          Password: UserApp.password,
          UserName: UserApp.userName
        },
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
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const insertAppInUserApp = (id, apps) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post(
        "/Mustering/UserApp/InsertAppInUserApp",
        { UserId: id, Apps: apps },
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
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};

export const editUserApp = userApp => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .put(
        "/Mustering/UserApp/EditUserApp",
        {
          UserId: userApp.id,
          Name: userApp.name,
          Password: userApp.password,
          UserName: userApp.userName,
          Apps: userApp.apps
        },
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
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch(error => {
        reject({
          error: error
        });
      });
  });
};
export const deleteUserApp = id => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .delete(
        "/Mustering/UserApp/DeleteUserApp",
        { UserId: id },
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
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
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
  createUserApp,
  getAllUserApp,
  getAllApp,
  insertAppInUserApp,
  getUserApp,
  editUserApp,
  deleteUserApp
};

export default API;
