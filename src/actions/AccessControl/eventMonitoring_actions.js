export const REQUEST_GET_EVENTS = "REQUEST_GET_EVENTS";
export const REQUEST_GET_EVENT_BY_ID = "REQUEST_GET_EVENT_BY_ID";
export const REQUEST_GET_PERSON_IMAGE = "REQUEST_GET_PERSON_IMAGE";
export const REQUEST_GET_ACCESS_IMAGE = "REQUEST_GET_ACCESS_IMAGE";

export const RECEIVE_GET_EVENTS = "RECEIVE_GET_EVENTS";
export const RECEIVE_GET_EVENT_BY_ID = "RECEIVE_GET_EVENT_BY_ID";
export const RECEIVE_GET_PERSON_IMAGE = "RECEIVE_GET_PERSON_IMAGE";
export const RECEIVE_GET_ACCESS_IMAGE = "RECEIVE_GET_ACCESS_IMAGE";
export const REQUEST_GET_EVENTS_REPORT = "REQUEST_GET_EVENTS_REPORT";
export const RECEIVE_GET_EVENTS_REPORT = "RECEIVE_GET_EVENTS_REPORT";
export const REQUEST_GET_EVENTS_XLS = "REQUEST_GET_EVENTS_XLS";
export const RECEIVE_GET_EVENTS_XLS = "RECEIVE_GET_EVENTS_XLS";
export const REQUEST_GET_PERSON_ENTERPRISE_XLS =
  "REQUEST_GET_PERSON_ENTERPRISE_XLS";
export const RECEIVE_GET_PERSON_ENTERPRISE_XLS =
  "RECEIVE_GET_PERSON_ENTERPRISE_XLS";
export const REQUEST_GET_ENTERPRISE_XLS = "REQUEST_GET_ENTERPRISE_XLS";
export const RECEIVE_GET_ENTERPRISE_XLS = "RECEIVE_GET_ENTERPRISE_XLS";
export const REQUEST_ERROR = "REQUEST_ERROR";

export const requestGetEvents = (datatable) => {
  return { type: REQUEST_GET_EVENTS, info: datatable };
};

export const requestGetEventsReport = (datatable) => {
  return { type: REQUEST_GET_EVENTS_REPORT, info: datatable };
};

export const requestGetEventsXLS = (datatable) => {
  return { type: REQUEST_GET_EVENTS_XLS, info: datatable };
};

export const requestGetPersonEnterpriseXLS = (datatable) => {
  return { type: REQUEST_GET_PERSON_ENTERPRISE_XLS, info: datatable };
};

export const requestGetEnterpriseXLS = (datatable) => {
  return { type: REQUEST_GET_ENTERPRISE_XLS, info: datatable };
};

export const requestGetEventById = (data) => {
  return { type: REQUEST_GET_EVENT_BY_ID, info: data };
};

export const requestGetPersonImage = (id) => {
  return { type: REQUEST_GET_PERSON_IMAGE, info: id };
};

export const requestGetAccessImage = (id) => {
  return { type: REQUEST_GET_ACCESS_IMAGE, info: id };
};

export const receiveGetEvents = (data) => {
  return { type: RECEIVE_GET_EVENTS, info: data };
};

export const receiveGetEventById = (data) => {
  return { type: RECEIVE_GET_EVENT_BY_ID, info: data };
};

export const receiveGetPersonImage = (image) => {
  return { type: RECEIVE_GET_PERSON_IMAGE, info: image };
};

export const receiveGetAccessImage = (image) => {
  return { type: RECEIVE_GET_ACCESS_IMAGE, info: image };
};
