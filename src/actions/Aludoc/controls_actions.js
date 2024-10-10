export const RECEIVE_CONTROLS = "RECEIVE_CONTROLS";
export const CREATE_RECEIVE_CONTROL = "CREATE_RECEIVE_CONTROL";
export const CREATE_REQUEST_CONTROL = "CREATE_REQUEST_CONTROL";
export const EDIT_RECEIVE_CONTROL = "EDIT_RECEIVE_CONTROL";
export const EDIT_REQUEST_CONTROL = "EDIT_REQUEST_CONTROL";
export const REQUEST_HIGHEST_CONTROL_ID = "REQUEST_HIGHEST_CONTROL_ID";
export const RECEIVE_HIGHEST_CONTROL_ID = "RECEIVE_HIGHEST_CONTROL_ID";
export const DETAIL_RECEIVE_CONTROL = "DETAIL_RECEIVE_CONTROL";
export const DETAIL_REQUEST_CONTROL = "DETAIL_REQUEST_CONTROL";

export const DELETE_RECEIVE_CONTROL = "DELETE_RECEIVE_CONTROL";
export const DELETE_REQUEST_CONTROL = "DELETE_REQUEST_CONTROL";

export const REQUEST_PERSONS_BY_CONTROL = "REQUEST_PERSONS_BY_CONTROL";
export const RECEIVE_PERSONS_BY_CONTROL = "RECEIVE_PERSONS_BY_CONTROL";

export const REQUEST_IS_CONTROL_NAME_AVAILABLE =
  "REQUEST_IS_CONTROL_NAME_AVAILABLE";
export const RECEIVE_IS_CONTROL_NAME_AVAILABLE =
  "RECEIVE_IS_CONTROL_NAME_AVAILABLE";

export const REQUEST_CONTROLS = "REQUEST_CONTROLS";
export const REQUEST_CONTROLS_ERROR = "REQUEST_CONTROLS_ERROR";
export const REQUEST_SET_CONTROL_NOTIFICATIONS =
  "REQUEST_SET_CONTROL_NOTIFICATIONS";
export const RECEIVE_SET_CONTROL_NOTIFICATIONS =
  "RECEIVE_SET_CONTROL_NOTIFICATIONS";
export const REQUEST_CONTROL_PEOPLE_GRAPH_DATA =
  "REQUEST_CONTROL_PEOPLE_GRAPH_DATA";
export const RECEIVE_CONTROL_PEOPLE_GRAPH_DATA =
  "RECEIVE_CONTROL_PEOPLE_GRAPH_DATA";
export const REQUEST_COMPANIES_BY_CONTROL_ID =
  "REQUEST_COMPANIES_BY_CONTROL_ID";
export const RECEIVE_COMPANIES_BY_CONTROL_ID =
  "RECEIVE_COMPANIES_BY_CONTROL_ID";

export const requestEnterprisesByControl = (id) => ({
  type: REQUEST_COMPANIES_BY_CONTROL_ID,
  id,
});

export const requestPersonByControl = (datatable) => ({
  type: REQUEST_PERSONS_BY_CONTROL,
  datatable,
});

export const requestControls = (datatable) => ({
  type: REQUEST_CONTROLS,
  datatable,
});

export const requestSetControlsNotifications = (data) => ({
  type: REQUEST_SET_CONTROL_NOTIFICATIONS,
  data,
});

export const receiveControls = (controls) => ({
  type: RECEIVE_CONTROLS,
  controls,
});

export const requestHighestControlId = () => ({
  type: REQUEST_HIGHEST_CONTROL_ID,
});

export const receiveHighestControlId = (highestControlId) => ({
  type: RECEIVE_HIGHEST_CONTROL_ID,
  highestControlId,
});

export const createReceiveControls = (id) => ({
  type: CREATE_RECEIVE_CONTROL,
  id,
});

export const createRequestControl = (control) => ({
  type: CREATE_REQUEST_CONTROL,
  control,
});

export const editReceiveControls = (id) => ({
  type: EDIT_RECEIVE_CONTROL,
  id,
});

export const editRequestControl = (control) => ({
  type: EDIT_REQUEST_CONTROL,
  control,
});

export const detailReceiveControls = (control) => ({
  type: DETAIL_RECEIVE_CONTROL,
  control,
});

export const deleteRequestControl = (payload) => ({
  type: DELETE_REQUEST_CONTROL,
  payload,
});

export const deleteReceiveControls = (success) => ({
  type: DELETE_RECEIVE_CONTROL,
  success,
});

export const detailRequestControl = (payload) => ({
  type: DETAIL_REQUEST_CONTROL,
  payload,
});

export const requestControlsError = (error) => ({
  type: REQUEST_CONTROLS_ERROR,
  error,
});

export const requestControlPeopleGraphData = () => ({
  type: REQUEST_CONTROL_PEOPLE_GRAPH_DATA,
});

export const requestIsControlNameAvailable = (controlName) => ({
  type: REQUEST_IS_CONTROL_NAME_AVAILABLE,
  controlName,
});
