export const REQUEST_UPDATE_TABLE = "REQUEST_UPDATE_TABLE";
export const RECEIVE_UPDATE_TABLE = "RECEIVE_UPDATE_TABLE";
export const REQUEST_ERROR = "REQUEST_ERROR";

export const requestUpdateTable = (payload) => {
  return { type: REQUEST_UPDATE_TABLE, payload };
};
