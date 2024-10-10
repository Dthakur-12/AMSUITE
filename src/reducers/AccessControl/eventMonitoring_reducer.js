import {
  REQUEST_GET_EVENTS,
  REQUEST_GET_EVENT_BY_ID,
  REQUEST_GET_PERSON_IMAGE,
  REQUEST_GET_ACCESS_IMAGE,
  RECEIVE_GET_EVENTS,
  RECEIVE_GET_EVENT_BY_ID,
  RECEIVE_GET_PERSON_IMAGE,
  RECEIVE_GET_ACCESS_IMAGE,
  REQUEST_GET_EVENTS_REPORT,
  RECEIVE_GET_EVENTS_REPORT,
  REQUEST_GET_EVENTS_XLS,
  RECEIVE_GET_EVENTS_XLS,
  REQUEST_GET_PERSON_ENTERPRISE_XLS,
  RECEIVE_GET_PERSON_ENTERPRISE_XLS,
  REQUEST_GET_ENTERPRISE_XLS,
  RECEIVE_GET_ENTERPRISE_XLS,
  REQUEST_ERROR,
} from "../../actions/AccessControl/eventMonitoring_actions";

const eventMonitoring_reducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_GET_EVENTS:
      return { ...state, successGetEvents: false, loading: true };
    case REQUEST_GET_EVENTS_REPORT:
      return { ...state, successGetEvents: false, loading: true };
    case REQUEST_GET_EVENTS_XLS:
      return {
        ...state,
        successGetEvents: false,
        loading: true,
        error: undefined,
      };
    case REQUEST_GET_PERSON_ENTERPRISE_XLS:
      return {
        ...state,
        successGetEvents: false,
        successDownloadPersonEnterpriseXLS: false,
        loading: true,
        error: undefined,
      };
    case REQUEST_GET_ENTERPRISE_XLS:
      return {
        ...state,
        successGetEvents: false,
        successDownloadXLS: false,
        loading: true,
        error: undefined,
      };
    case REQUEST_GET_EVENT_BY_ID:
      return { ...state, successGetEventById: false, loadingGetById: true };
    case REQUEST_GET_PERSON_IMAGE:
      return { ...state, successPersonImage: false };
    case REQUEST_GET_ACCESS_IMAGE:
      return { ...state, successAccessImage: false };
    case RECEIVE_GET_EVENTS:
      return {
        ...state,
        loading: false,
        successGetEvents: true,
        events: action.data,
      };
    case RECEIVE_GET_EVENTS_REPORT:
      return {
        ...state,
        loading: false,
        successGetEvents: true,
        events: action.data,
      };
    case RECEIVE_GET_EVENTS_XLS:
      return {
        ...state,
        loading: false,
        successDownloadXLS: true,
        eventReport: action.data,
      };
    case RECEIVE_GET_PERSON_ENTERPRISE_XLS:
      return {
        ...state,
        loading: false,
        successDownloadPersonEnterpriseXLS: true,
        eventReport: action.data,
      };
    case RECEIVE_GET_ENTERPRISE_XLS:
      return {
        ...state,
        loading: false,
        successDownloadXLS: true,
        eventReport: action.data,
      };
    case RECEIVE_GET_EVENT_BY_ID:
      return {
        ...state,
        successGetEventById: true,
        loadingGetById: false,
        eventById: action.data,
      };
    case RECEIVE_GET_PERSON_IMAGE:
      return { ...state, successPersonImage: true, personImage: action.data };
    case RECEIVE_GET_ACCESS_IMAGE:
      return { ...state, successAccessImage: true, accessImage: action.data };
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        loadingGetById: false,
        successAccessImage: false,
        successPersonImage: false,
        successGetEventById: false,
        successGetEvents: false,
        successDownloadXLS: false,
        successDownloadPersonEnterpriseXLS: false,
      };
    default:
      return state;
  }
};

export default eventMonitoring_reducer;
