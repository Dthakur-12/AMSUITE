import {
  CREATE_REQUEST_VIRTUAL_ZONE,
  CREATE_RECEIVE_VIRTUAL_ZONE,
  EDIT_REQUEST_VIRTUAL_ZONE,
  EDIT_RECEIVE_VIRTUAL_ZONE,
  REQUEST_VIRTUAL_ZONE,
  RECEIVE_VIRTUAL_ZONE,
  DELETE_REQUEST_VIRTUAL_ZONE,
  DELETE_RECEIVE_VIRTUAL_ZONE,
  REQUEST_VIRTUAL_ZONE_ERROR,
} from "../../actions/AccessControl/virtualZone_actions";

const virtualZoneReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_VIRTUAL_ZONE:
      return {
        ...state,
        loading: true,
        error: false,
        successVirtualzone: false,
      };
    case RECEIVE_VIRTUAL_ZONE:
      return {
        ...state,
        virtualZones: action.data.data,
        virtualZoneCount: action.data.dataCount,
        loading: false,
        error: false,
        successVirtualzone: true,
      };
    case CREATE_REQUEST_VIRTUAL_ZONE:
      return { ...state, createSuccess: false, loading: true, error: false };
    case CREATE_RECEIVE_VIRTUAL_ZONE:
      return {
        ...state,
        createSuccess: true,
        success: true,
        loading: false,
        error: false,
      };
    case DELETE_REQUEST_VIRTUAL_ZONE:
      return { ...state, deleteSuccess: false, error: false };
    case DELETE_RECEIVE_VIRTUAL_ZONE:
      return {
        ...state,
        deleteSuccess: true,
        error: false,
      };
    case EDIT_REQUEST_VIRTUAL_ZONE:
      return { ...state, editSuccess: false, loading: true, error: false };
    case EDIT_RECEIVE_VIRTUAL_ZONE:
      return {
        ...state,
        editSuccess: true,
        success: true,
        loading: false,
        error: false,
      };
    case REQUEST_VIRTUAL_ZONE_ERROR:
      return { ...state, error: true, messagge: action.data };
    default:
      return state;
  }
};

export default virtualZoneReducer;
