export const REQUEST_GET_ACCESSLEVELS = "REQUEST_GET_ACCESSLEVELS";
export const REQUEST_DELETE_ACCESSLEVEL = "REQUEST_DELETE_ACCESSLEVEL";
export const REQUEST_CREATE_ACCESSLEVEL = "REQUEST_CREATE_ACCESSLEVEL";
export const REQUEST_GET_ACCESSLEVEL = "REQUEST_GET_ACCESSLEVEL";

export const RECEIVE_GET_ACCESSLEVELS = "RECEIVE_GET_ACCESSLEVELS";
export const RECEIVE_DELEETE_ACCESSLEVEL = "RECEIVE_DELETE_ACCESSLEVEL";
export const RECEIVE_CREATE_ACCESSLEVEL = "RECEIVE_CREATE_ACCESSLEVEL";
export const RECEIVE_GET_ACCESSLEVEL = "RECEIVE_GET_ACCESSLEVELS";

export function requestGetAccesLevels(datatable) {
  return { type: REQUEST_GET_ACCESSLEVELS, datatable };
}

export function requestDeleteAccssLevel(id) {
  return { type: REQUEST_DELETE_ACCESSLEVEL, id };
}

export function requestGetAccesLevel(id) {
  return { type: REQUEST_GET_ACCESSLEVEL, id };
}

export function requestCreateAccssLevel(accessLevel) {
  return { type: REQUEST_CREATE_ACCESSLEVEL, data: accessLevel };
}

export function receiveGetAccessLevels(accessLevels) {
  return { type: RECEIVE_GET_ACCESSLEVELS, data: accessLevels };
}

export function receiveGetAccessLevel(accessLevel) {
  return { type: RECEIVE_GET_ACCESSLEVEL, data: accessLevel };
}

export function receiveDeleteAccessLevel() {
  return { type: RECEIVE_DELETE_ACCESSLEVEL };
}

export function reciveCreateAccssLevel() {
  return { type: RECEIVE_CREATE_ACCESSLEVEL };
}