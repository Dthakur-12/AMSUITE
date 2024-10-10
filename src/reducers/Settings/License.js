import {
  RECEIVE_GET_LICENSE,
  REQUEST_GET_LICENSE,
  REQUEST_GET_LICENSED_IMEI_LIST,
  RECEIVE_GET_LICENSED_IMEI_LIST,
} from "../../actions/Settings/license_actions";

function license(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_GET_LICENSED_IMEI_LIST:
      return { ...state, successGetUnlicensedIMEIs: false };
    case RECEIVE_GET_LICENSED_IMEI_LIST:
      return { ...state, successGetUnlicensedIMEIs: true, unlicensedIMEIs: action.data };
    case REQUEST_GET_LICENSE:
      return { ...state, successGetLicense: false };
    case RECEIVE_GET_LICENSE:
      return { ...state, successGetLicense: true, license: action.data };
    default:
      return state;
  }
}

export default license;
