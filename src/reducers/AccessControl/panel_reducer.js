import {
  REQUEST_GET_PANELS,
  REQUEST_DELETE_PANELS,
  REQUEST_LOGOFF_PANEL,
  REQUEST_CREATE_PANEL,
  REQUEST_EDIT_PANEL,
  REQUEST_GET_BY_ID,
  REQUEST_GET_MOBILE_PANELS,
  REQUEST_HISTORICAL_GPS,
  RECEIVE_HISTORICAL_GPS,
  RECEIVE_GET_PANELS,
  RECEIVE_DELETE_PANELS,
  RECEIVE_LOGOFF_PANEL,
  RECEIVE_CREATE_PANEL,
  RECEIVE_EDIT_PANEL,
  RECEIVE_GET_BY_ID,
  RECEIVE_GET_MOBILE_PANELS,
  REQUEST_ERROR,
  REQUEST_GET_READER_MODE,
  RECEIVE_GET_READER_MODE,
  REQUEST_GET_WORKING_MODES,
  RECEIVE_GET_WORKING_MODES,
  REQUEST_GET_ROUTES,
  RECEIVE_GET_ROUTES,
  REQUEST_CREATE_BUS_CAPACITY,
  RECEIVE_CREATE_BUS_CAPACITY,
  REQUEST_GET_BUS_CAPACITIES,
  RECEIVE_GET_BUS_CAPACITIES,
  REQUEST_DELETE_BUS_CAPACITY,
  REQUEST_UPDATE_BUS_CAPACITY,
  RECEIVE_DELETE_BUS_CAPACITY,
  RECEIVE_UPDATE_BUS_CAPACITY,
  REQUEST_DELETE_ROUTE,
  RECEIVE_DELETE_ROUTE,
  REQUEST_CREATE_OR_EDIT_ROUTE,
  RECEIVE_CREATE_OR_EDIT_ROUTE,
} from "../../actions/AccessControl/panel_actions";

const panel_reducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_GET_PANELS:
      return { ...state, loading: true, successGetPanels: false };
    case REQUEST_DELETE_PANELS:
      return { ...state, loading: true, successDeletePanel: false };
    case REQUEST_LOGOFF_PANEL:
      return { ...state, successLogOffPanel: false, loadingLogOffPanel: true };
    case REQUEST_CREATE_PANEL:
      return {
        ...state,
        loading: true,
        successCreatePanel: false,
        loadingCreateorEdit: true,
      };
    case REQUEST_GET_ROUTES:
      return { ...state, loading: true, successGetRoutes: false };
    case REQUEST_EDIT_PANEL:
      return { ...state, successEditPanel: false, loadingCreateorEdit: true };
    case REQUEST_GET_BY_ID:
      return { ...state, successGetById: false };
    case REQUEST_GET_MOBILE_PANELS:
      return {
        ...state,
        loadingMobilePanels: true,
        successGetMobilePanels: false,
      };
    case REQUEST_HISTORICAL_GPS:
      return {
        ...state,
        loadingHistoricalTracking: true,
        successHistoricalTracking: false,
      };
    case REQUEST_GET_WORKING_MODES:
      return {
        ...state,
        loadingWorkingModes: true,
        successWorkingModes: false,
      };

    case REQUEST_CREATE_BUS_CAPACITY:
      return {
        ...state,
        loadingCreateCapacity: true,
        successCreateCapacity: false,
      };
    case REQUEST_GET_BUS_CAPACITIES:
      return {
        ...state,
        loadingGetCapacities: true,
        successGetCapacities: false,
      };
    case REQUEST_DELETE_ROUTE:
      return {
        ...state,
        successDeleteRoute: false,
        loadingDeleteRoute: true,
      };
    case REQUEST_CREATE_OR_EDIT_ROUTE:
      return {
        ...state,
        successCreateOrEditRoute: false,
        loadingDeleteRoute: true,
      };
    case RECEIVE_CREATE_OR_EDIT_ROUTE:
      return {
        ...state,
        successCreateOrEditRoute: true,
      };
    case RECEIVE_DELETE_ROUTE:
      return {
        ...state,
        successDeleteRoute: true,
      };
    case RECEIVE_GET_BUS_CAPACITIES:
      return {
        ...state,
        loadingGetCapacities: false,
        successGetCapacities: true,
        capacities: action.data,
      };
    case RECEIVE_CREATE_BUS_CAPACITY:
      return {
        ...state,
        loadingCreateCapacity: false,
        successCreateCapacity: true,
      };

    case REQUEST_DELETE_BUS_CAPACITY:
      return {
        ...state,
        successDeleteBusCapacity: false,
        loadingDeleteCapacity: true,
      };
    case REQUEST_UPDATE_BUS_CAPACITY:
      return {
        ...state,
        loadingUpdateCapacity: true,
        successUpdateBusCapacity: false,
      };
    case RECEIVE_DELETE_BUS_CAPACITY:
      return {
        ...state,
        successDeleteBusCapacity: true,
        loadingDeleteCapacity: false,
      };
    case RECEIVE_UPDATE_BUS_CAPACITY:
      return {
        ...state,
        loadingUpdateCapacity: false,
        successUpdateBusCapacity: true,
      };

    case RECEIVE_GET_WORKING_MODES:
      return {
        ...state,
        loadingWorkingModes: false,
        successWorkingModes: true,
        workingModes: action.data,
      };
    case RECEIVE_HISTORICAL_GPS:
      return {
        ...state,
        loadingHistoricalTracking: false,
        successHistoricalTracking: true,
        pointsGPS: action.data.gpsPoints,
        possiblyMoreItems: action.data.possiblyMoreItems,
        maxDateReached: action.data.maxDateReached,
      };

    case RECEIVE_GET_PANELS:
      return {
        ...state,
        loading: false,
        successGetPanels: true,
        panels: action.data.data,
        panelsCount: action.data.dataCount,
        info: action.data,
      };

    case RECEIVE_GET_ROUTES:
      return {
        ...state,
        loading: false,
        successGetPanels: true,
        routes: action.data,
      };
    case RECEIVE_DELETE_PANELS:
      return { ...state, loading: false, successDeletePanel: true };
    case RECEIVE_LOGOFF_PANEL:
      return { ...state, successLogOffPanel: true, loadingLogOffPanel: false };
    case RECEIVE_CREATE_PANEL:
      return {
        ...state,
        loading: false,
        successCreatePanel: true,
        loadingCreateorEdit: false,
      };
    case RECEIVE_EDIT_PANEL:
      return { ...state, successEditPanel: true, loadingCreateorEdit: false };
    case RECEIVE_GET_BY_ID:
      return {
        ...state,
        successGetById: true,
        panelById: action.data,
      };
    case RECEIVE_GET_MOBILE_PANELS:
      return {
        ...state,

        loadingMobilePanels: false,
        successGetMobilePanels: true,
        mobilePanels: action.data,
      };
    case REQUEST_GET_READER_MODE:
      return {
        ...state,
        loadingReaderModes: true,
      };
    case RECEIVE_GET_READER_MODE:
      return {
        ...state,
        readerModes: action.data,
        loadingReaderModes: false,
      };
    case REQUEST_ERROR:
      console.log("errrrrrr", action);
      return {
        loadingLogOffPanel: false,
        loading: false,
        loadingMobilePanels: false,
        error: action.error,
        errorData: action.error,
        successGetPanels: false,
        successDeletePanel: false,
        successLogOffPanel: false,
        successCreatePanel: false,
        successEditPanel: false,
        successGetMobilePanels: false,
        loadingCreateCapacity: false,
        loadingUpdateCapacity: false,
        loadingCreateorEdit: false,
      };

    default:
      return state;
  }
};

export default panel_reducer;
