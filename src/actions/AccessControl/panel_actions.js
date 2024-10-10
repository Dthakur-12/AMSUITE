export const REQUEST_GET_PANELS = "REQUEST_GET_PANELS";
export const REQUEST_DELETE_PANELS = "REQUEST_DELETE_PANELS";
export const REQUEST_LOGOFF_PANEL = "REQUEST_LOGOFF_PANEL";
export const REQUEST_CREATE_PANEL = "REQUEST_CREATE_PANEL";
export const REQUEST_EDIT_PANEL = "REQUEST_EDIT_PANEL";
export const REQUEST_GET_BY_ID = "REQUEST_GET_BY_ID";
export const REQUEST_GET_MOBILE_PANELS = "REQUEST_GET_MOBILE_PANELS";
export const REQUEST_GET_READER_MODE = "REQUEST_GET_READER_MODE";
export const REQUEST_CREATE_OR_EDIT_ROUTE = "REQUEST_CREATE_OR_EDIT_ROUTE";
export const REQUEST_DELETE_ROUTE = "REQUEST_DELETE_ROUTE";
export const REQUEST_GET_WORKING_MODES = "REQUEST_GET_WORKING_MODES";
export const REQUEST_CREATE_BUS_CAPACITY = "REQUEST_CREATE_BUS_CAPACITY";
export const REQUEST_DELETE_BUS_CAPACITY = "REQUEST_DELETE_BUS_CAPACITY";
export const REQUEST_UPDATE_BUS_CAPACITY = "REQUEST_UPDATE_BUS_CAPACITY";
export const REQUEST_GET_BUS_CAPACITIES = "REQUEST_GET_BUS_CAPACITIES";

export const RECEIVE_CREATE_OR_EDIT_ROUTE = "RECEIVE_CREATE_OR_EDIT_ROUTE";
export const RECEIVE_DELETE_ROUTE = "RECEIVE_DELETE_ROUTE";
export const RECEIVE_GET_READER_MODE = "RECEIVE_GET_READER_MODE";
export const RECEIVE_GET_PANELS = "RECEIVE_GET_PANELS";
export const RECEIVE_DELETE_PANELS = "RECEIVE_DELETE_PANELS";
export const RECEIVE_LOGOFF_PANEL = "RECEIVE_LOGOFF_PANEL";
export const RECEIVE_CREATE_PANEL = "RECEIVE_CREATE_PANEL";
export const RECEIVE_EDIT_PANEL = "RECEIVE_EDIT_PANEL";
export const RECEIVE_GET_BY_ID = "RECEIVE_GET_BY_ID";
export const RECEIVE_GET_MOBILE_PANELS = "RECEIVE_GET_MOBILE_PANELS";
export const REQUEST_HISTORICAL_GPS = "REQUEST_HISTORICAL_GPS";
export const RECEIVE_HISTORICAL_GPS = "RECEIVE_HISTORICAL_GPS";
export const REQUEST_ERROR = "REQUEST_ERROR";
export const RECEIVE_GET_WORKING_MODES = "RECEIVE_GET_WORKING_MODES";
export const RECEIVE_CREATE_BUS_CAPACITY = "RECEIVE_CREATE_BUS_CAPACITY";
export const RECEIVE_DELETE_BUS_CAPACITY = "RECEIVE_DELETE_BUS_CAPACITY";
export const RECEIVE_UPDATE_BUS_CAPACITY = "RECEIVE_UPDATE_BUS_CAPACITY";

export const RECEIVE_GET_BUS_CAPACITIES = "RECEIVE_GET_BUS_CAPACITIES";

export const RECEIVE_GET_ROUTES = "RECEIVE_GET_ROUTES";
export const REQUEST_GET_ROUTES = "REQUEST_GET_ROUTES";
// REQUEST!!!

export const requestCreateBusCapacity = (dataTable) => {
  return { type: REQUEST_CREATE_BUS_CAPACITY, info: dataTable };
};

export const requestUpdateBusCapacity = (infoCapacity) => {
  return { type: REQUEST_UPDATE_BUS_CAPACITY, info: infoCapacity };
};

export const requestDeleteBusCapacity = (ids) => {
  return { type: REQUEST_DELETE_BUS_CAPACITY, info: ids };
};

export const requestGetBusTypesCapacity = (infoCapacity) => {
  return { type: REQUEST_GET_BUS_CAPACITIES, info: infoCapacity };
};

export const requestGetReaderModes = (datatable) => {
  return { type: REQUEST_GET_READER_MODE, info: datatable };
};

export const requestGetWorkingModes = () => {
  return { type: REQUEST_GET_WORKING_MODES };
};

export const requestGetPanels = (datatable) => {
  return { type: REQUEST_GET_PANELS, info: datatable };
};

export const requestHistoricalTracking = (infoPanel) => {
  return { type: REQUEST_HISTORICAL_GPS, info: infoPanel };
};

export const requestDeletePanels = (panels = []) => {
  return { type: REQUEST_DELETE_PANELS, info: panels };
};

export const requestLogOffPanel = (id) => {
  return { type: REQUEST_LOGOFF_PANEL, info: id };
};

export const requestCreatePanel = (panel) => {
  return { type: REQUEST_CREATE_PANEL, info: panel };
};

export const requestEditPanel = (panel) => {
  return { type: REQUEST_EDIT_PANEL, info: panel };
};

export const requestGetById = (id) => {
  return { type: REQUEST_GET_BY_ID, info: id };
};

export const requestGetMobilePanels = (datatable) => {
  return { type: REQUEST_GET_MOBILE_PANELS, info: datatable };
};

export const requestGetRoutes = (data) => {
  return { type: REQUEST_GET_ROUTES, info: data };
};
export const requestCreateOrEditRoute = (data) => {
  return { type: REQUEST_CREATE_OR_EDIT_ROUTE, info: data };
};
export const requestDeleteRoute = (id) => {
  return { type: REQUEST_DELETE_ROUTE, id: id };
};
//RECEIVE!!!

export const receiveHistoricalTracking = (panelsGPS) => {
  return { type: RECEIVE_HISTORICAL_GPS, info: panelsGPS };
};

export const receiveGetPanels = (panels = []) => {
  return { type: RECEIVE_GET_PANELS, info: panels };
};

export const receiveDeletePanels = () => {
  return { type: RECEIVE_DELETE_PANELS };
};

export const receiveLogOffPanel = () => {
  return { type: RECEIVE_LOGOFF_PANEL };
};

export const receiveCreatePanel = () => {
  return { type: RECEIVE_CREATE_PANEL };
};

export const receiveEditPanel = () => {
  return { type: RECEIVE_EDIT_PANEL };
};

export const receiveGetById = (panel) => {
  return { type: RECEIVE_GET_BY_ID, info: panel };
};

export const receiveGetMobilePanels = (data) => {
  return { type: RECEIVE_GET_MOBILE_PANELS, info: data };
};

export const receiveGetRoutes = (data) => {
  return { type: RECEIVE_GET_ROUTES, info: data };
};
