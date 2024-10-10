export const REQUEST_CHECK_CREDENTIALS = "REQUEST_CHECK_CREDENTIALS";
export const RECEIVE_CHECK_CREDENTIALS = "RECEIVE_CHECK_CREDENTIALS";
export const REQUEST_CHECK_CREDENTIALS_ERROR =
  "REQUEST_CHECK_CREDENTIALS_ERROR";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGIN = "LOGIN";
export const LOGIN_ACTIVE_DIRECTORY = "LOGIN_ACTIVE_DIRECTORY";
export const TRY_LOGIN = "TRY_LOGIN";
export const USER_ERROR = "USER_ERROR";
export const LOGIN_CLEAR_STORE = "LOGIN_CLEAR_STORE";
export const REQUEST_USER_ACTIVITIES = "REQUEST_USER_ACTIVITIES";
export const RECEIVE_USER_ACTIVITIES = "RECEIVE_USER_ACTIVITIES";

export const REQUEST_CREATE_USER_SAML_PERMITS =
  "REQUEST_CREATE_USER_SAML_PERMITS";
export const RECEIVE_CREATE_USER_SAML_PERMITS =
  "RECEIVE_CREATE_USER_SAML_PERMITS";

export const REQUEST_USERS = "REQUEST_USERS";
export const RECEIVE_USERS = "RECEIVE_USERS";

export const createSamlPermits = payload => ({
  type: REQUEST_CREATE_USER_SAML_PERMITS,
  payload
});

export const requestUsers = dataTable => ({
  type: REQUEST_USERS,
  dataTable
});

export const checkCredentials = credentials => ({
  type: REQUEST_CHECK_CREDENTIALS,
  credentials
});

export const currentUser = payload => ({
  type: RECEIVE_CURRENT_USER,
  payload
});

export const login = payload => ({
  type: LOGIN,
  payload
});

export const loginActiveDirectory = payload => ({
  type: LOGIN_ACTIVE_DIRECTORY,
  payload
});

export const tryLogin = payload => ({
  type: TRY_LOGIN,
  payload
});

export const clearLoginStore = () => ({
  type: LOGIN_CLEAR_STORE
});

export const requestAllUserActivities = dataTable => ({
  type: REQUEST_USER_ACTIVITIES,
  dataTable
});
