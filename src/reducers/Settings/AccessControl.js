import {
  REQUEST_MOBILE_SETTINGS,
  RECEIVE_MOBILE_SETTINGS,
  REQUEST_UPDATE_MOBILE_SETTINGS,
  RECEIVE_UPDATE_MOBILE_SETTINGS,
  REQUEST_ERROR_MOBILE_SETTINGS,
} from "../../actions/Settings/accessControl_actions";

function accessControl(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_MOBILE_SETTINGS:
      return {
        ...state,
        configSAML: undefined,
        isLoading: true,
      };
    case RECEIVE_MOBILE_SETTINGS:
      //loginSAML: configSAML.loginProtocol == 1,
      return {
        ...state,
        configSAML: {
          ...action.data,
          loginSAML: action.data.loginProtocol == 1,
        },
        isLoading: false,
        error: false,
      };
    case REQUEST_UPDATE_MOBILE_SETTINGS:
      return {
        ...state,
        isCreating: false,
      };
    case RECEIVE_UPDATE_MOBILE_SETTINGS:
      return { ...state, isCreating: true, error: false };
    case REQUEST_ERROR_MOBILE_SETTINGS:
      return {
        ...state,
        error: true,
        // isLoading: false,
      };
    default:
      return state;
  }
}

export default accessControl;
