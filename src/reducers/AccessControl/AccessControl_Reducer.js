import {
  REQUEST_GET_ACCESSLEVELS,
  REQUEST_DELETE_ACCESSLEVEL,
  REQUEST_CREATE_ACCESSLEVEL,
  REQUEST_GET_ACCESSLEVEL,
  RECEIVE_GET_ACCESSLEVELS,
  RECEIVE_DELEETE_ACCESSLEVELS,
  RECEIVE_CREATE_ACCESSLEVEL,
  RECEIVE_GET_ACCESSLEVEL
} from "../../actions/AccessControl/accessLevel_actions";

const AccessControlReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_CREATE_ACCESSLEVEL:
      return { ...state, loading: true, successCreateAccessLevel: false };
    case RECEIVE_CREATE_ACCESSLEVEL:
      return { ...state, loading: false, successCreateAccessLevel: true };
    case REQUEST_GET_ACCESSLEVELS:
      return { ...state, loading: true, successGetAccessLevels: false };
    case RECEIVE_GET_ACCESSLEVELS:
      return {
        ...state,
        loading: false,
        successGetAccessLevels: true,
        accessLevels: action.data
      };
    case REQUEST_DELETE_ACCESSLEVEL:
      return { ...state, loading: true, successDeleteAccessLevel: false };
    case RECEIVE_DELEETE_ACCESSLEVELS:
      return { ...state, loading: false, successDeleteAccessLevel: true };
    case REQUEST_GET_ACCESSLEVEL:
      return { ...state, loading: true, successGetAccessLevel: false };
    case RECEIVE_GET_ACCESSLEVEL:
      return {
        ...state,
        loading: false,
        successGetAccessLevel: true,
        accessLevel: action.data
      };
    default:
      return state;
  }
};

export default AccessControlReducer;
