import {
  REQUEST_CHECK_CREDENTIALS,
  RECEIVE_CHECK_CREDENTIALS,
  REQUEST_CHECK_CREDENTIALS_ERROR,
  RECEIVE_CURRENT_USER,
  USER_ERROR,
  LOGIN_ACTIVE_DIRECTORY,
  LOGIN,
  LOGIN_CLEAR_STORE,
  REQUEST_USER_ACTIVITIES,
  RECEIVE_USER_ACTIVITIES,
  RECEIVE_USERS,
  REQUEST_CREATE_USER_SAML_PERMITS,
  RECEIVE_CREATE_USER_SAML_PERMITS,
} from "../../actions/Users/user_actions";

const usersReducers = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_CHECK_CREDENTIALS:
      return {
        ...state,
        checkingCredentials: true,
        validCredentials: false,
        invalidCredentials: false,
      };
    case RECEIVE_USERS:
      return { ...state, users: action.data };
    case RECEIVE_CHECK_CREDENTIALS:
      return { ...state, checkingCredentials: false, validCredentials: true };
    case REQUEST_CHECK_CREDENTIALS_ERROR:
      return { ...state, checkingCredentials: false, invalidCredentials: true };
    case RECEIVE_CURRENT_USER:
      return { ...state, currentUser: action.data, isLogin: false };
    case LOGIN:
      return { ...state, isLoginButton: true, isLogin: true };
    case LOGIN_ACTIVE_DIRECTORY:
      return { ...state, isLoginButtonActiveDirectory: true, isLogin: true };
    case USER_ERROR:
      return {
        ...state,
        error: action.error,
        isLoginButtonActiveDirectory: false,
        isLoginButton: false,
        isLogin: false,
      };
    case LOGIN_CLEAR_STORE:
      return {
        ...state,
        isLoginButton: false,
        isLogin: false,
        isLoginButtonActiveDirectory: false,
        error: "",
      };
    case REQUEST_USER_ACTIVITIES:
      return {
        ...state,
        isLoading: true,
        succesUserActivities: false,
      };
    case RECEIVE_USER_ACTIVITIES:
      return {
        ...state,
        isLoading: false,
        userActivities: action.data,
        succesUserActivities: true,
      };
    default:
      return state;
  }
};

export default usersReducers;
