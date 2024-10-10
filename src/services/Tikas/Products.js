import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";

import { TIMEOUT } from "../../Config";

let api;

export const getProducts = (withImages) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/Tikas/Products/Get",
        { withImages },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          });
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

export const createProductWithImage = (name, file) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    let data = new FormData();
    data.append("file", file);
    const config = {
      params: { name: name },
      headers: {
        contentType: false,
        processData: false,
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };
    api
      .post("/Tikas/Products/Create/", data, config)
      .then((response) => {
        if (response.ok) {
          resolve();
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

export const editProduct = (productId, name, updateImage, file) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    let data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        contentType: false,
        processData: false,
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
      params: { productId: productId, name: name, updateImage: updateImage },
    };
    api
      .put("/Tikas/Products/Update/", data, config)
      .then((response) => {
        if (response.ok) {
          resolve();
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

export const deleteProducts = (productIds) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post("/Tikas/Products/Delete", productIds, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve();
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else if (response.status === 405)
            resolve({
              data: response.data,
            });
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

export const deleteImage = (id) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .delete(
        "/EasyAccess/Persons/DeleteImage",
        { id: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        if (response.ok) {
          resolve();
        } else {
          if (response.problem === "NETWORK_ERROR")
            console.log("Network error");
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push("/");
          else if (response.status === 405)
            resolve({
              data: response.data,
            });
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

export const updateImage = (id, file) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    let data = new FormData();
    data.append("file", file);
    const config = {
      params: {},
      headers: {
        contentType: false,
        processData: false,
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };
    api
      .put("/EasyAccess/Persons/UpdateImage/" + id, data, config)
      .then((response) => {
        if (response.ok) {
          resolve();
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

export const getEvents = (start, length, order, search) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  let data = [];
  for (let i = 0; i < length; i++) {
    data.push({
      Id: i,
      Name: "Product " + i,
    });
  }
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          data: { data: data, dataCount: 100 },
        }),
      1500
    );
  });
};
export const API = {
  getProducts, //
  deleteProducts, //
  editProduct, //
  getEvents,
  createProductWithImage,
};

export default API;
