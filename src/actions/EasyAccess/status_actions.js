export const REQUEST_GET_STATUSES = "REQUEST_GET_STATUSES";
export const REQUEST_DELETE_STATUS = "REQUEST_DELETE_STATUS";
export const REQUEST_GET_STATUS_BY_ID = "REQUEST_GET_STATUS_BY_ID";
export const REQUEST_EDIT_STATUS = "REQUEST_EDIT_STATUS";
export const REQUEST_CREATE_STATUS = "REQUEST_CREATE_STATUS";

export const RECEIVE_GET_STATUSES = "RECEIVE_GET_STATUSES";
export const RECEIVE_DELETE_STATUS = "RECEIVE_DELETE_STATUS";
export const RECEIVE_GET_STATUS_BY_ID = "RECEIVE_GET_STATUS_BY_ID";
export const RECEIVE_EDIT_STATUS = "RECEIVE_EDIT_STATUS";
export const RECEIVE_CREATE_STATUS = "RECEIVE_CREATE_STATUS";

export const RESET_AFTER_EDIT_CREATE = "RESET_AFTER_EDIT_CREATE";
export const REQUEST_ERROR = "REQUEST_ERROR";

export const requestGetStatuses = datatable => {
  return { type: REQUEST_GET_STATUSES, info: datatable };
};

export const requestDeleteStatuses = ids => {
  return { type: REQUEST_DELETE_STATUS, info: ids };
};

export const requestGetStatusById = id => {
  return { type: REQUEST_GET_STATUS_BY_ID, info: id };
};

export const requestEditStatus = status => {
  return { type: REQUEST_EDIT_STATUS, info: status };
};

export const requestCreateStatus = data => {
  return { type: REQUEST_CREATE_STATUS, info: data };
};

export const receiveGetStatuses = data => {
  return { type: RECEIVE_GET_STATUSES, info: data };
};

export const receiveDeletetStatuses = data => {
  return { type: RECEIVE_DELETE_STATUS, info: data };
};

export const receiveGetStatusById = data => {
  return { type: RECEIVE_GET_STATUS_BY_ID, info: data };
};

export const receiveEditStatus = () => {
  return { type: RECEIVE_EDIT_STATUS };
};

export const receiveCreateStatus = () => {
  return { type: RECEIVE_CREATE_STATUS };
};

export const requestResetData = () => {
  return { type: RESET_AFTER_EDIT_CREATE };
};
