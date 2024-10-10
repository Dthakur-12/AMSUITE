import {
  REQUEST_GET_BADGE_TYPES,
  REQUEST_GET_BADGE_BY_ID,
  REQUEST_GET_BADGE_STATUS,
  REQUEST_GET_ALL_BADGE_STATUS,
  REQUEST_CREATE_BADGE,
  REQUEST_CREATE_BADGE_TYPE,
  REQUEST_EDIT_BADGE,
  REQUEST_DELETE_BADGES,
  RECEIVE_GET_BADGE_TYPES,
  RECEIVE_GET_BADGE_BY_ID,
  RECEIVE_GET_BADGE_STATUS,
  RECEIVE_GET_ALL_BADGE_STATUS,
  RECEIVE_CREATE_BADGE,
  RECEIVE_CREATE_BADGE_TYPE,
  RECEIVE_EDIT_BADGE,
  RECEIVE_DELETE_BADGES,

} from "../../actions/AccessControl/badge_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_GET_BADGE_TYPES:
      return { ...state, loadingBadgeTypes: true };
    case RECEIVE_GET_BADGE_TYPES:
      return { ...state, badgeTypes: action.data };

    case REQUEST_GET_BADGE_BY_ID:
      return { ...state, loadingBadge: true };
    case RECEIVE_GET_BADGE_BY_ID:
      return { ...state, badge: action.data };

    case REQUEST_GET_BADGE_STATUS:
      return { ...state, loadingBadgeStatus: true };
    case RECEIVE_GET_BADGE_STATUS:
      return { ...state, badgeStatus: action.data };

    case REQUEST_GET_ALL_BADGE_STATUS:
      return { ...state, loadingBadgeStatus: true };
    case RECEIVE_GET_ALL_BADGE_STATUS:
      return { ...state, allBadgeStatus: action.data };

    case REQUEST_CREATE_BADGE:
      return { ...state, isCreating: true };
    case RECEIVE_CREATE_BADGE:
      return { ...state, isCreating: false };

    case REQUEST_CREATE_BADGE_TYPE:
      return { ...state, isCreating: true };
    case RECEIVE_CREATE_BADGE_TYPE:
      return { ...state, isCreating: false };

    case REQUEST_EDIT_BADGE:
      return { ...state, isCreating: true };
    case RECEIVE_EDIT_BADGE:
      return { ...state, isCreating: false };

    case REQUEST_DELETE_BADGES:
      return { ...state, loading: true };
    case RECEIVE_DELETE_BADGES:
      return { ...state };

    default:
      return state;
  }
};
