export const GET_WEB = "GET_WEB";
export const ADD_WEB = "ADD_WEB";

export const getWeb = () => ({
  type: GET_WEB
});

export const addWeb = payload => ({
  type: ADD_WEB,
  payload
});
