import {
  REQUEST_TEST_CONNECTION,
  RECEIVE_TEST_CONNECTION,
  REQUEST_TEST_CONNECTION_ERROR,
  REQUEST_GET_APP_LOGO,
  REQUEST_SET_APP_LOGO,
  RECEIVE_SET_APP_LOGO,
  RECEIVE_GET_APP_LOGO,
  REQUEST_UPDATE_SYSTEM_COLORS,
  CLEAR_APP_LOGO,
  REQUEST_VERSION,
  RECEIVE_VERSION,
  REQUEST_SEND_TEST_EMAIL,
  RECEIVE_SEND_TEST_EMAIL,
} from "../../actions/Settings/system_actions";
const documentReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_TEST_CONNECTION:
      return { ...state, success: false, loading: true };
    case RECEIVE_TEST_CONNECTION:
      return { ...state, loading: false, success: true };
    case REQUEST_TEST_CONNECTION_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };

    case REQUEST_GET_APP_LOGO:
      return {
        ...state,
        successLogoUpdated: false,
      };

    case REQUEST_SET_APP_LOGO:
      return {
        ...state,
        successLogoUpdated: false,
      };

    case REQUEST_SEND_TEST_EMAIL:
      return {
        ...state,
        successfullySended: false,
      };

    case RECEIVE_SEND_TEST_EMAIL:
      return {
        ...state,
        successfullySended: true,
      };
    case REQUEST_VERSION:
      return {
        ...state,
        successGetVersion: false,
      };
    case RECEIVE_SET_APP_LOGO:
      return {
        ...state,
        successLogoUpdated: true,
      };
    case RECEIVE_GET_APP_LOGO:
      return {
        ...state,
        appLogo: action.data,
      };
    case CLEAR_APP_LOGO:
      return {
        ...state,
        appLogo: undefined,
      };
    case REQUEST_UPDATE_SYSTEM_COLORS:
      return {
        ...state,
        systemColors: {
          ...state.systemColors,
          [action.data.name]: action.data.hex,
        },
      };
    case RECEIVE_VERSION:
      return {
        ...state,
        successGetVersion: true,
        version: action.data,
      };
    default:
      return state;
  }
};
export default documentReducer;
