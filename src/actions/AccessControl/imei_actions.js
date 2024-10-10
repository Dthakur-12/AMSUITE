export const REQUEST_GET_IMEI = "REQUEST_GET_IMEI";
export const REQUEST_CREATE_IMEI = "REQUEST_CREATE_IMEI";
export const REQUEST_EDIT_IMEI = "REQUEST_EDIT_IMEI";
export const REQUEST_DELETE_IMEI = "REQUEST_DELETE_IMEI";

export const RECEIVE_GET_IMEI = "RECEIVE_GET_IMEI";
export const RECEIVE_CREATE_IMEI = "RECEIVE_CREATE_IMEI";
export const RECEIVE_EDIT_IMEI = "RECEIVE_EDIT_IMEI";
export const RECEIVE_DELETE_IMEI = "RECEIVE_DELETE_IMEI";

export const REQUEST_ERROR = "REQUEST_ERROR";

export const requestGetImei = datatable => {
  return { type: REQUEST_GET_IMEI, info: datatable };
};

export const requestCreateImei = imei => {
  return { type: REQUEST_CREATE_IMEI, info: imei };
};

export const requestEditImei = imei => {
  return { type: REQUEST_EDIT_IMEI, info: imei };
};

export const requestDeleteImei = id => {
  return { type: REQUEST_DELETE_IMEI, info: id };
};

export const receiveGetImei = data => {
  return { type: RECEIVE_GET_IMEI, info: data };
};

export const receiveCreateImei = response => {
  return { type: RECEIVE_CREATE_IMEI, info: response };
};

export const receiveEditImei = editResponse => {
  return { type: RECEIVE_EDIT_IMEI, info: editResponse };
};

export const receiveDeleteImei = () => {
  return { type: RECEIVE_DELETE_IMEI };
};
