import { create } from "apisauce";
import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { TIMEOUT } from "../../Config";

let api;

export const getEvents = (start, length, order, search) => {
  let data = [];
  for (let i = 0; i < length; i++) {
    data.push({
      Id: 1,
      Name: "Enano",
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
    // api.get('/Calendar/GetEvents', { start, length, draw, search }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } })
    //     .then((response) => {
    //         if (response.ok) {
    //             resolve({
    //                 data: response.data.payments
    //             })
    //         } else {
    //             if (response.problem === 'NETWORK_ERROR')
    //             else
    //                 if (response.status === 401)
    //                     AppBarSinPos.appNavigation.history.push('/')
    //                 else
    //                     reject({
    //                         error: response.data
    //                     })
    //         }
    //     }).catch((error) => {
    //         reject({
    //             error: error
    //         })
    //     })
  });
};

export const getBadgeFormats = (start, length, order, search) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Badges/GetBadgeFormats",
        { start, length, order, search },
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

export const createCardFormat = (cardFormat) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/AccessControl/CardFormats/CreateCardFormat", cardFormat, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const editCardFormat = (cardFormat) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.put("/AccessControl/CardFormats/Edit", cardFormat, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const assignReaders = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.put("/AccessControl/CardFormats/AssignReaders", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const assignCardFormatByReader = (readerId, cardFormatIds) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    let cardFormatReaders = {
      id: readerId,
      CardFormats: cardFormatIds,
    };
    api
      .put(
        "/AccessControl/CardFormats/AssignCardFormatByReader",
        cardFormatReaders,
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

export const UpdateCardFormatsByReaderId = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.put(
    "/AccessControl/CardFormats/UpdateCardFormatsByReaderId",
    info,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const getCardFormats = (info) => {
  console.log("info: ", info);
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.get("/AccessControl/CardFormats/GetCardFormats", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getCardFormatByID = (id) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/AccessControl/CardFormats/GetCardFormatById",
        { id },
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

export const getCardFormatReaders = (id) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.get(
    "/AccessControl/CardFormats/GetCardFormatReaders",
    { id },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const deleteCardFormat = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.delete(
    "/AccessControl/CardFormats/DeleteCardFormat",
    {},
    {
      data: info,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const API = {
  getEvents,
  getBadgeFormats,
  createCardFormat, //
  editCardFormat, //
  getCardFormats, //
  getCardFormatByID, //
  deleteCardFormat, //
  getCardFormatReaders, //
  assignReaders,
  assignCardFormatByReader,
  UpdateCardFormatsByReaderId,
};

export default API;
