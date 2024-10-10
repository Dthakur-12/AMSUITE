import {
  REQUEST_BADGES,
  RECEIVE_BADGES,
  REQUEST_UNASSIGNED_BADGES,
  RECEIVE_UNASSIGNED_BADGES,
  REQUEST_BADGES_ERROR,
  REQUEST_COUNT_BADGES_FOR_AUTOASSIGN,
  RECEIVE_COUNT_BADGES_FOR_AUTOASSIGN,
  REQUEST_BADGES_STATUSES,
  RECEIVE_BADGES_STATUSES,
  REQUEST_PRINT_BADGE,
  RECEIVE_PRINT_BADGE,
  REQUEST_BADGE_BY_QR,
  RECEIVE_BADGE_BY_QR,
  CLEAR_IMAGE_STORE
} from "../../actions/EasyAccess/Badges_actions";

const badgesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_BADGE_BY_QR: {
      return { ...state, successQR: false };
    }

    case RECEIVE_BADGE_BY_QR: {
      return {
        ...state,
        successQR: true,
        qrImage: action.data
      };
    }
    case CLEAR_IMAGE_STORE: {
      return { ...state, qrImage: null };
    }
    case REQUEST_BADGES:
      return { ...state, successBadges: false, loading: true };
    case RECEIVE_BADGES:
      return {
        ...state,
        successBadges: true,
        loading: false,
        badges: action.data
      };

    case REQUEST_BADGES_STATUSES:
      return {
        ...state,
        succesBadgesStatus: false,
        loadingStatus: true
      };
    case RECEIVE_BADGES_STATUSES:
      return {
        ...state,
        succesBadgesStatus: true,
        loadingStatus: false,
        statuses: action.data
      };
    case REQUEST_UNASSIGNED_BADGES:
      return { ...state, successUnassignedBadges: false, loading: true };
    case RECEIVE_UNASSIGNED_BADGES:
      return {
        ...state,
        successUnassignedBadges: true,
        loading: false,
        unassignedBadges: action.data
      };
    case REQUEST_COUNT_BADGES_FOR_AUTOASSIGN:
      return {
        ...state,
        successCountBadges: false,
        loading: true,
        error: false
      };
    case RECEIVE_COUNT_BADGES_FOR_AUTOASSIGN:
      return {
        ...state,
        successCountBadges: true,
        loading: false,
        countbadges: action.data
      };
    case REQUEST_BADGES_ERROR:
      return { loading: false, msgError: action.error, error: true };
    case REQUEST_PRINT_BADGE:
      return { ...state, loading: true };
    case RECEIVE_PRINT_BADGE:
      return { ...state, loading: false, successPrint: true };
    default:
      return state;
  }
};
export default badgesReducer;
