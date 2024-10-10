import {
  REQUEST_CONTROLS,
  RECEIVE_CONTROLS,
  CREATE_RECEIVE_CONTROL,
  CREATE_REQUEST_CONTROL,
  EDIT_RECEIVE_CONTROL,
  EDIT_REQUEST_CONTROL,
  DETAIL_RECEIVE_CONTROL,
  DETAIL_REQUEST_CONTROL,
  DELETE_RECEIVE_CONTROL,
  DELETE_REQUEST_CONTROL,
  REQUEST_CONTROLS_ERROR,
  REQUEST_HIGHEST_CONTROL_ID,
  RECEIVE_HIGHEST_CONTROL_ID,
  REQUEST_PERSONS_BY_CONTROL,
  RECEIVE_PERSONS_BY_CONTROL,
  REQUEST_CONTROL_PEOPLE_GRAPH_DATA,
  RECEIVE_CONTROL_PEOPLE_GRAPH_DATA,
  REQUEST_SET_CONTROL_NOTIFICATIONS,
  RECEIVE_SET_CONTROL_NOTIFICATIONS,
  REQUEST_COMPANIES_BY_CONTROL_ID,
  RECEIVE_COMPANIES_BY_CONTROL_ID,
  REQUEST_IS_CONTROL_NAME_AVAILABLE,
  RECEIVE_IS_CONTROL_NAME_AVAILABLE,
} from "../../actions/Aludoc/controls_actions.js";

const controlsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_CONTROLS:
      return { ...state, loading: true, isLoadingNewData: true };
    case CREATE_REQUEST_CONTROL:
      return { ...state, loading: true, error: false, successCr: false };
    case REQUEST_SET_CONTROL_NOTIFICATIONS:
      return { ...state, loadingNotification: true, successNotif: false };
    case RECEIVE_SET_CONTROL_NOTIFICATIONS:
      return { ...state, loadingNotification: false, successNotif: true };
    case RECEIVE_CONTROLS:
      return {
        ...state,
        controls: action.data.data,
        dataCount: action.data.dataCount,
        loading: false,
        error: false,
        isLoadingNewData: false,
        isSearching: false,
      };
    case REQUEST_COMPANIES_BY_CONTROL_ID:
      return { ...state, successEnterprise: false, loadingEnterprise: true };

    case RECEIVE_COMPANIES_BY_CONTROL_ID:
      return {
        ...state,
        successEnterprise: true,
        loadingEnterprise: false,
        enterprises: action.data,
      };
    case REQUEST_HIGHEST_CONTROL_ID:
      return {
        ...state,
        loadingHighestId: true,
        loading: true,
        error: true,
      };
    case RECEIVE_HIGHEST_CONTROL_ID:
      return {
        ...state,
        loading: false,
        loadingHighestId: false,
        error: false,
        highestControlId: action.data.highestControlId,
        isLoadingNewData: false,
        isSearching: false,
      };
    case CREATE_RECEIVE_CONTROL:
      return {
        ...state,
        loading: false,
        successCr: action.data !== -1,
        error: action.data === -1,
      };
    case EDIT_REQUEST_CONTROL:
      return { ...state, loading: true, isEditSuccess: false };
    case EDIT_RECEIVE_CONTROL:
      return {
        ...state,
        id: -1,
        isEditSuccess: action.data,
        loading: false,
      };
    case DELETE_REQUEST_CONTROL:
      return { ...state, isDeleted: false, loading: true };
    case DELETE_RECEIVE_CONTROL:
      return {
        ...state,
        error: false,
        isDeleted: action.data,
        loading: false,
      };
    case DETAIL_REQUEST_CONTROL:
      return { ...state, error: false, loading: true, successDetails: false };
    case DETAIL_RECEIVE_CONTROL:
      return {
        ...state,
        control: action.control,
        error: false,
        successDetails: true,
        loading: false,
      };
    case REQUEST_PERSONS_BY_CONTROL:
      return {
        ...state,
        successGetPerson: false,
      };
    case RECEIVE_PERSONS_BY_CONTROL:
      return {
        ...state,
        control: {
          ...state.control,
          people: action.data.data,
          peopleCount: action.data.dataCount,
        },
        successGetPerson: true,
      };
    case REQUEST_CONTROLS_ERROR:
      return {
        ...state,
        error: true,
        errorText: action.error
          ? action.error.error
            ? action.error.error.errorData
            : ""
          : "",
        loading: false,
        success: false,
      };

    case REQUEST_CONTROL_PEOPLE_GRAPH_DATA:
      return {
        ...state,
        loadingControlPeopleGraphData: true,
      };
    case RECEIVE_CONTROL_PEOPLE_GRAPH_DATA:
      return {
        ...state,
        loadingControlPeopleGraphData: false,
        controlPeopleGraphData: action.data,
      };
    case REQUEST_IS_CONTROL_NAME_AVAILABLE:
      return {
        ...state,
        loadingNameAvailable: true,
      };
    case RECEIVE_IS_CONTROL_NAME_AVAILABLE:
      return {
        ...state,
        isNameAvailable: action.data,
        loadingNameAvailable: false,
      };
    default:
      return state;
  }
};

export default controlsReducer;
