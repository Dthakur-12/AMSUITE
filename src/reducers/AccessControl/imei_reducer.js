import {
  REQUEST_GET_IMEI,
  REQUEST_CREATE_IMEI,
  REQUEST_EDIT_IMEI,
  REQUEST_DELETE_IMEI,
  RECEIVE_GET_IMEI,
  RECEIVE_CREATE_IMEI,
  RECEIVE_EDIT_IMEI,
  RECEIVE_DELETE_IMEI,
  REQUEST_ERROR,
} from "../../actions/AccessControl/imei_actions";

const imei_reducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_GET_IMEI:
      return { ...state, successGetImei: false };
    case REQUEST_CREATE_IMEI:
      return { ...state, successCreateImei: false, error: undefined };
    case REQUEST_EDIT_IMEI:
      return { ...state, successEditImei: false, error: undefined };
    case REQUEST_DELETE_IMEI:
      return { ...state, successDeleteImei: false, loadingDeleteImei: true };
    case RECEIVE_GET_IMEI:
      return { ...state, successGetImei: true, imeis: action.data };
    case RECEIVE_CREATE_IMEI:
      return { ...state, successCreateImei: true, createResponse: action.data };
    case RECEIVE_EDIT_IMEI:
      return { ...state, successEditImei: true, editResponse: action.data };
    case RECEIVE_DELETE_IMEI:
      return { ...state, successDeleteImei: true, loadingDeleteImei: false };
    case REQUEST_ERROR:
      return {
        ...state,
        successGetImei: false,
        successCreateImei: false,
        successEditImei: false,
        successDeleteImei: false,
        loadingDeleteImei: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default imei_reducer;
