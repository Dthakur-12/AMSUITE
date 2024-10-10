export const REQUEST_GET_LICENSE = "REQUEST_GET_LICENSE";
export const RECEIVE_GET_LICENSE = "RECEIVE_GET_LICENSE";
export const REQUEST_ERROR = "REQUEST_ERROR";
export const REQUEST_GET_LICENSED_IMEI_LIST = 'REQUEST_GET_LICENSED_IMEI_LIST';
export const RECEIVE_GET_LICENSED_IMEI_LIST = 'RECEIVE_GET_LICENSED_IMEI_LIST';


export const requestGetUnlicensedIMEIs = () => ({
  type: REQUEST_GET_LICENSED_IMEI_LIST,
})

export const requestGetLicense = () => {
  return { type: REQUEST_GET_LICENSE };
};

export const receiveGetLicense = data => {
  return { type: RECEIVE_GET_LICENSE, data };
};
