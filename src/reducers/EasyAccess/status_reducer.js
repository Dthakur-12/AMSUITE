import {
  REQUEST_GET_STATUSES,
  REQUEST_DELETE_STATUS,
  REQUEST_GET_STATUS_BY_ID,
  REQUEST_EDIT_STATUS,
  REQUEST_CREATE_STATUS,
  RECEIVE_GET_STATUSES,
  RECEIVE_DELETE_STATUS,
  RECEIVE_GET_STATUS_BY_ID,
  RECEIVE_EDIT_STATUS,
  RECEIVE_CREATE_STATUS,
  REQUEST_ERROR,
  RESET_AFTER_EDIT_CREATE
} from "../../actions/EasyAccess/status_actions";

const statusReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_GET_STATUSES:
      return {
        ...state,
        loading: true,
        successGetStatuses: false
      };
    case REQUEST_DELETE_STATUS:
      return { ...state, successDeleteStatus: false };
    case REQUEST_GET_STATUS_BY_ID:
      return { ...state, successGetStatusById: false };
    case REQUEST_EDIT_STATUS:
      return { ...state, successEditStatus: false };
    case REQUEST_CREATE_STATUS:
      return {
        ...state,
        successCreateStatus: false,
        loadingCreateStatus: true
      };
    case RECEIVE_GET_STATUSES:
      return {
        ...state,
        loading: false,
        successGetStatuses: true,
        statuses: action.data
      };
    case RECEIVE_DELETE_STATUS:
      return {
        ...state,
        successDeleteStatus: true,
        deleteResponse: action.data
      };
    case RECEIVE_GET_STATUS_BY_ID:
      return { ...state, successGetStatusById: true, statusById: action.data };
    case RECEIVE_EDIT_STATUS:
      return { ...state, successEditStatus: true };
    case RECEIVE_CREATE_STATUS:
      return {
        ...state,
        successCreateStatus: true,
        loadingCreateStatus: false
      };
    case RESET_AFTER_EDIT_CREATE:
      return {
        ...state,
        successCreateStatus: false,
        successEditStatus: false,
        loadingCreateStatus: false
      };
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        successGetStatuses: false,
        successDeleteStatus: false,
        successGetStatusById: false,
        successEditStatus: false,
        successCreateStatus: false
      };
    default:
      return state;
  }
};

export default statusReducer;
