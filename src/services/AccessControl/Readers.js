import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";
import { TIMEOUT } from "../../Config";

let api;

export const createReader = info => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.post("/EasyAccess/Readers/CreateReader", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }
  });
};

export const editReader = info => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.post("/EasyAccess/Readers/EditReader", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }
  });
};

export const deleteReader = reader => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .post("/EasyAccess/Readers/DeleteReader", reader, {
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

export const assignAccessLevels = info => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.post("/EasyAccess/Readers/AssignAccessLevel", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }
  });
};

export const checkReaderName = readerName => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });

  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Readers/CheckReaderName",
        { readerName: readerName },
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

export const getAccessLevels = readerId => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Readers/GetAccessLevelsList",
        { readerId: readerId },
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

export const getTypes = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  let data = [];
  let dataVal = ["No Definido", "Entrada", "Salida"];
  for (let i = 0; i < 3; i++) {
    data.push({
      Id: i,
      Name: dataVal[i]
    });
  }
  return data;
};

export const getEvents = (start, length, order, search) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  let data = [];
  for (let i = 0; i < length; i++) {
    data.push({
      Id: 1,
      Name: "Enano",
      Type: "Enano",
      Panel: "Enano"
    });
  }

  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          data: { data: data, dataCount: 100 }
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

export const getExitReader = (start, length, order, search) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Readers/GetExitReaders",
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

export const getEntranceReader = (start, length, order, search) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Readers/GetEntranceReaders",
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

export const getReaders = info => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.get(
    "/EasyAccess/Readers/GetReaders",
    { ...info, onlyAlutelOnes: true },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const getDeviceReader = info => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return api.get(
    "/EasyAccess/Readers/GetDeviceReader",
    { ...info, onlyAlutelOnes: true },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const getCardFormatIds = id => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });

  return api.get(
    "/EasyAccess/Readers/GetCardFormatIds",
    { id },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }
  );
};

export const getVirtualReaders = ({ start, length, order, search }) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Readers/GetVirtualReaders",
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

export const GetVirtualReadersByPanel = panelId => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Readers/GetVirtualReadersByPanel",
        { panelId },
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

// export const getCardFormatIds = id => {
//   api = create({
//     baseURL: localStorage.getItem("urlApi"),
//     timeout: TIMEOUT
//   });
//   return new Promise((resolve, reject) => {
//     return api
//       .get(
//         "/EasyAccess/Readers/GetCardFormatIds",
//         { id },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("userToken")
//           }
//         }
//       )
//       .then(response => {
//         if (response.ok) {
//           resolve({
//             data: response.data
//           });
//         } else {
//           if (response.problem === "NETWORK_ERROR")
//           else if (response.status === 401)
//             AmSuiteNavBar.appNavigation.history.push("/");
//           else
//             reject({
//               error: response.data
//             });
//         }
//       })
//       .catch(error => {
//         reject({
//           error: error
//         });
//       });
//   });
// };

export const API = {
  getEvents,
  getEntranceReader,
  getExitReader,
  getTypes,
  createReader, //
  editReader, //sin probar
  deleteReader,
  checkReaderName,
  assignAccessLevels,
  getAccessLevels,
  getReaders, //
  getCardFormatIds,
  getVirtualReaders, //
  GetVirtualReadersByPanel,
  getDeviceReader
};

export default API;
