import {
  VISIT_REQUEST_NOTIFICATIONS,
  RECEIVE_VISIT_REQUEST,
  CLEAN_VISIT_REQUEST,
  NOTIFICATIONS_ERROR,
} from "../../actions/Notifications/systemNotifications_actions";

const notifications = {
  visitRequest: { title: "VisitRequestNotify", active: false },
};

const systemNotifications = (state = { ...notifications }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case VISIT_REQUEST_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case RECEIVE_VISIT_REQUEST:
      return {
        ...state,
        error: false,
        visitRequest: { ...state.visitRequest, active: true },
      };
    case CLEAN_VISIT_REQUEST:
      return {
        ...state,
        error: false,
        visitRequest: { ...state.visitRequest, active: false },
      };
    case NOTIFICATIONS_ERROR:
      return { ...state, error: true, loading: false, success: false };
    default:
      return state;
  }
};

export default systemNotifications;
