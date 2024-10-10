import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { create } from "apisauce";

import { TIMEOUT } from "../../Config";
//import { string } from "prop-types";

let api;

export const getEmployees = (dataTable) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return new Promise((resolve, reject) => {
    api
      .post(
        "/EasyAccess/Registers/GetRegisters",
        {
          ...dataTable,
          Type: 1,
          originCompanies: dataTable.extraData,
          OnlyHostEmployees: dataTable.extraData1,
          skipUserVisibilityCheck: dataTable.extraData2,
        },
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
export const getRegistersAnonymous = (dataTable) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post(
        "/EasyAccess/Registers/GetRegistersAnonymous",
        {
          start: dataTable.start,
          length: dataTable.length,
          order: dataTable.order,
          search: dataTable.search,
          Type: 1,
          originCompanies: dataTable.extraData,
          OnlyHostEmployees: true,
        },
        {
          headers: {
            Authorization:
              "Bearer oITQ86J+s7vz7thJArHfTY0tDys28Z8lUNXtRchELkI=",
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

export const getHostEmployees = (
  start,
  length,
  order,
  search,
  originCompanies,
  onlyHostCompanies,
  skipUserVisibilityCheck
) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post(
        "/EasyAccess/Registers/GetRegisters",
        {
          start,
          length,
          order,
          search,
          Type: 1,
          originCompanies,
          onlyHostCompanies,
          skipUserVisibilityCheck,
          onlyHostEmployees: true,
        },
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

export const getPersons = (dataTable) => {
  console.log("dataTable: ", dataTable);
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  if (dataTable.extraData) {
    let isValid = false;
    dataTable.extraData.map((id) => {
      if (id > 0) isValid = true;
    });
    if (isValid)
      dataTable = { ...dataTable, OriginCompanies: dataTable.extraData };
  }
  return new Promise((resolve, reject) => {
    api
      .post("/EasyAccess/Registers/GetRegisters", dataTable, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
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

export const getTypes = () => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Persons/GetPersonTypes",
        {},
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

export const getEmployeeById = (id) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Persons/GetPersonById",

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

export const checkDocumentNumbers = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Persons/CheckDocumentNumbers",

        info,
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

export const getXLSWithVisitorGroup = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post("/EasyAccess/Persons/GetXLSWithVisitorGroup", info, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
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

export const getPersonByDocumentNumberAnonymous = (document) => {
  const doc = JSON.parse(JSON.stringify(document));
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Persons/GetPersonByDocumentNumberAnonymous",

        doc,
        {
          headers: {
            Authorization:
              "Bearer oITQ86J+s7vz7thJArHfTY0tDys28Z8lUNXtRchELkI=",
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

export const createPerson = (person) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post("/EasyAccess/Persons/Create", person, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
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

export const createPersonAnonymous = (person) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  person.Discriminator = 1;
  person.status = -1;
  return new Promise((resolve, reject) => {
    api
      .post("/EasyAccess/Persons/CreateAnonymous", person, {
        headers: {
          Authorization: "Bearer oITQ86J+s7vz7thJArHfTY0tDys28Z8lUNXtRchELkI=",
        },
      })
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

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

export const setImageURL = ({ id, file }) => {
  var blob = dataURItoBlob(file);
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    let data = new FormData();
    data.append("file", blob);
    const config = {
      params: { idString: id },
      headers: {
        contentType: false,
        processData: false,
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };
    api
      .post("/EasyAccess/Persons/SetImageUrl", data, config)
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

export const setImage = ({ id, file }) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    let data = new FormData();
    data.append("file", file);
    const config = {
      params: { idString: id },
      headers: {
        contentType: false,
        processData: false,
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };
    api
      .post("/EasyAccess/Persons/SetImage", data, config)
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

export const setImageAnonymous = ({ id, file }) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  let data = new FormData();
  data.append("file", file);
  const config = {
    params: { id: id },
    headers: {
      contentType: false,
      processData: false,
      Authorization: "Bearer oITQ86J+s7vz7thJArHfTY0tDys28Z8lUNXtRchELkI=",
    },
  };
  //new Promise((resolve, reject) => {
  return api.post("/EasyAccess/Persons/SetImageAnonymous", data, config);
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
      headers: {
        contentType: false,
        processData: false,
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
      params: { id: id },
    };
    api
      .put("/EasyAccess/Persons/UpdateImage", data, config)
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

export const getImage = (id) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .get(
        "/EasyAccess/Persons/GetImage",
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

export const createGroup = (group) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post("/EasyAccess/Registers/CreateGroup", group, {
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

export const createVisitorGroup = (dataObject) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  let data = new FormData();
  dataObject.people.map((person, index) => {
    if (person.file) {
      data.append("file[]", person.file, person.file.name + "_" + index);
      data.append(person.file.name + "_" + index, index);
    }
    person.index = index;
    return 0;
  });
  let peopleWithOutFiles = dataObject.people.slice();
  // peopleWithOutFiles.map((person) => {
  //   person.file = undefined;
  //   return person;
  // });
  data.append(
    "Event",
    JSON.stringify({ ...dataObject, people: peopleWithOutFiles })
  );

  api.post("/EasyAccess/Persons/CreateVisitorGroup", data, {
    headers: {
      contentType: "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const getPersonGroups = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.post("/EasyAccess/PersonGroups/GetGroups", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const deletePersonGroup = (ids) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.delete(
    "/EasyAccess/PersonGroups/Delete",
    {},
    {
      data: [ids],
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const getPersonGroupById = (info) => {
  console.log("info: ", info);
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.get(
    "/EasyAccess/PersonGroups/Details",
    { id: info },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }
  );
};

export const createPersonsGroup = (info) => {
  console.log("info: ", info);
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return api.post("/EasyAccess/PersonGroups/Create", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};
export const getPersonsByGroupReport = (info) => {
  console.log("info: ", info);
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    api
      .post("/Reports/PersonsByGroup", info, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        console.log("response: ", response);
        if (response.ok) {
          resolve({ data: response.data });
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

export const getPersonsByGroupReportXLS = (info) => {
  api = create({
    baseURL: localStorage.getItem("urlApi"),
    timeout: TIMEOUT,
  });

  return api.post("/Reports/PersonByGroupXLS", info, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  });
};

export const API = {
  getEmployees,
  getRegistersAnonymous,
  getPersons,
  createPerson,
  createPersonAnonymous,
  createGroup,
  getTypes,
  setImage,
  setImageURL,
  getImage,
  deleteImage,
  updateImage,
  getEmployeeById,
  getHostEmployees,
  setImageAnonymous,
  getPersonByDocumentNumberAnonymous,
  createVisitorGroup,
  checkDocumentNumbers,
  getXLSWithVisitorGroup,
  createVisitorGroup,
  getPersonGroups,
  createPersonsGroup,
  deletePersonGroup,
  getPersonGroupById,
  getPersonsByGroupReport,
  getPersonsByGroupReportXLS,
};

export default API;
