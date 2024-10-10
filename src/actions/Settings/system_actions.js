export const REQUEST_TEST_CONNECTION = "REQUEST_TEST_CONNECTION";
export const RECEIVE_TEST_CONNECTION = "RECEIVE_TEST_CONNECTION";
export const REQUEST_TEST_CONNECTION_ERROR = "REQUEST_TEST_CONNECTION_ERROR";
export const ADD_SETTINGS = "ADD_SETTINGS";
export const GET_SETTINGS = "GET_SETTINGS";
export const REQUEST_SET_APP_LOGO = "REQUEST_SET_APP_LOGO";
export const REQUEST_GET_APP_LOGO = "REQUEST_GET_APP_LOGO";
export const RECEIVE_GET_APP_LOGO = "RECEIVE_GET_APP_LOGO";
export const CLEAR_APP_LOGO = "CLEAR_APP_LOGO";
export const RECEIVE_SET_APP_LOGO = "RECEIVE_SET_APP_LOGO";
export const REQUEST_UPDATE_SYSTEM_COLORS = "REQUEST_UPDATE_COLORS";
export const REQUEST_VERSION = "REQUEST_VERSION";
export const RECEIVE_VERSION = "RECEIVE_VERSION";
export const REQUEST_SEND_TEST_EMAIL = 'REQUEST_SEND_TEST_EMAIL';
export const RECEIVE_SEND_TEST_EMAIL = 'RECEIVE_SEND_TEST_EMAIL';


export const addAppLogo = (img, id) => ({
  type: REQUEST_SET_APP_LOGO,
  payload: { img, id }
});

export const getAppLogo = () => ({
  type: REQUEST_GET_APP_LOGO
});

export const clearAppLogo = () => ({
  type: CLEAR_APP_LOGO
});

export const sendTestEmail = (payload) => ({
  type: REQUEST_SEND_TEST_EMAIL,
  payload
})


export const updateSystemColors = (name, hex) => ({
  type: REQUEST_UPDATE_SYSTEM_COLORS,
  payload: { name, hex }
});

export const addSettings = payload => ({
  type: ADD_SETTINGS,
  payload
});

export const getSettings = settings => ({
  type: GET_SETTINGS,
  settings
});

export const requestTestConnection = domain => ({
  type: REQUEST_TEST_CONNECTION,
  domain
});

export const receiveTestConnection = payload => ({
  type: RECEIVE_TEST_CONNECTION,
  payload
});

export const requestTestConnectionError = error => ({
  type: REQUEST_TEST_CONNECTION_ERROR,
  error
});

export const requestVersion = () => ({
  type: REQUEST_VERSION
});

export const receiveVersion = data => ({
  type: RECEIVE_VERSION,
  info: data
});
