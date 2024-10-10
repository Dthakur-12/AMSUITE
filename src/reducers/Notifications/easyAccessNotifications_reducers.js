import {
  SET_REQUEST_EA_NOTIFICATIONS,
  SET_RECEIVE_EA_NOTIFICATIONS,
  REQUEST_EA_NOTIFICATIONS_ERROR,
  REQUEST_EA_NOTIFICATIONS,
  RECEIVE_EA_NOTIFICATIONS
} from "../../actions/Notifications/easyAccessNotifications_action";

const easyAccessNotificationsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_REQUEST_EA_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
        easyAccessSettings: undefined,
        error: false,
        success: false
      };
    case SET_RECEIVE_EA_NOTIFICATIONS:
      return {
        ...state,
        error: false,

        loading: false
      };
    case REQUEST_EA_NOTIFICATIONS_ERROR:
      return { ...state, error: true, loading: false, success: false };

    case REQUEST_EA_NOTIFICATIONS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_EA_NOTIFICATIONS:
      return {
        ...state,
        easyAccessNotifications: action.easyAccessNotifications.data,
        success: true,
        loading: false
      };
    default:
      return state;
  }
};

export default easyAccessNotificationsReducer;
